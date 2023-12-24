import { PersonService } from ".";

describe("Person", () => {
  describe("generatePersonNewPerson", () => {
    it("should generate a new person", () => {
      const person = PersonService.generateNewPerson({ name: "John" });
      expect(person).toEqual({
        id: expect.any(String),
        name: "John",
        balance: 0,
        paysTo: {},
      });
    });

    it("should generate a new person with a given id", () => {
      const person = PersonService.generateNewPerson({
        id: "test-id",
        name: "John",
      });
      expect(person).toEqual({
        id: "test-id",
        name: "John",
        balance: 0,
        paysTo: {},
      });
    });
  });

  describe("updatePerson", () => {
    it("should update a person", () => {
      const person = PersonService.generateNewPerson({ name: "John" });
      const updatedPerson = PersonService.updatePerson(person, {
        name: "Jane",
      });
      expect(updatedPerson).toEqual({
        id: person.id,
        name: "Jane",
        balance: 0,
        paysTo: {},
      });
    });
  });
});
