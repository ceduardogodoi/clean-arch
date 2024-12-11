import { describe, expect, it } from "vitest";
import { Animal } from "../../../../domain/animal/entity/animal";
import { createAnimalFixture, animalFixture } from "../../../_fixtures/animal";

describe("Animal entity", () => {
  it("should create a new animal", () => {
    const instance = Animal.create(createAnimalFixture);

    expect(instance).toHaveProperty(
      "id",
      expect.stringMatching(
        /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
      )
    );
    expect(instance).toHaveProperty("isAdopted", false);
  });

  it("should create an animal with input object", () => {
    const animal = Animal.with(animalFixture);
    expect(animal).toEqual(animalFixture);
  });
});
