import { Person } from "@/app/app/type";
import { v4 as uuid } from "uuid";

export const PersonService = {
  generateNewPerson: ({ id, name }: { id?: string; name: string }): Person => ({
    id: id ?? uuid(),
    name: name,
    balance: 0,
    paysTo: {},
  }),

  updatePerson: (person: Person, update: Partial<Person>): Person => ({
    ...person,
    ...update,
  }),
};
