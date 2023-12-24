import { Person } from "@/app/app/type";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import { ZUSTAND_PERSIST_KEYS } from "@/app/app/constant";

interface PeopleState {
  people: Person[];
  peopleMap: Record<string, Person>;
  addPerson: (data: Pick<Person, "name"> & Partial<Pick<Person, "id">>) => void;
  editPerson: (id: string, update: Partial<Person>) => void;
  removePerson: (id: string) => void;
  removeEveryone: () => void;
}

export const usePeopleStore = create<PeopleState>()(
  persist(
    (set) => ({
      people: [] as Person[],
      peopleMap: {} as Record<string, Person>,
      addPerson: ({ id, name }) => {
        const newPerson = {
          id: id ?? uuidv4(),
          name,
          balance: 0,
          paysTo: {},
        };
        set((state) => ({
          people: [...state.people, newPerson],
          peopleMap: {
            ...state.peopleMap,
            [newPerson.id]: newPerson,
          },
        }));
      },
      editPerson: (id, update) => {
        set((state) => ({
          people: state.people.map((person) =>
            person.id === id ? { ...person, ...update } : person
          ),
          peopleMap: {
            ...state.peopleMap,
            [id]: {
              ...state.peopleMap[id],
              ...update,
            },
          },
        }));
      },
      removePerson: (id) => {
        set((state) => {
          const { [id]: _, ...peopleMap } = state.peopleMap;
          return {
            people: state.people.filter((person) => person.id !== id),
            peopleMap,
          };
        });
      },
      removeEveryone: () => {
        set({ people: [], peopleMap: {} });
      },
    }),
    { name: ZUSTAND_PERSIST_KEYS.PEOPLE }
  )
);
