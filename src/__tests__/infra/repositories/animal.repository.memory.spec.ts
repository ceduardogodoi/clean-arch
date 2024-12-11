import { describe, expect, it, beforeEach } from "vitest";
import { AnimalRepositoryMemory } from "../../../infra/repositories/animal.repository.memory";
import { Animal } from "../../../domain/animal/entity/animal";
import { animalFixture, createAnimalFixture } from "../../_fixtures/animal";

describe("Animal in memory repository", () => {
  let instance: AnimalRepositoryMemory;
  beforeEach(() => {
    instance = AnimalRepositoryMemory.create();
  });

  it("should save an animal to the memory", async () => {
    const animal = Animal.with(animalFixture);
    await instance.save(animal);

    const animals = await instance.findAll();
    expect(animals).toHaveLength(1);
    expect(animals).toContainEqual(
      expect.objectContaining({
        id: animal.id,
      })
    );
  });

  it("should find all three saved animals", async () => {
    const QUANTITY_TO_SAVE = 3;
    Array.from({ length: QUANTITY_TO_SAVE }).forEach(async () => {
      const animal = Animal.create(createAnimalFixture);
      await instance.save(animal);
    });

    const animals = await instance.findAll();
    expect(animals).toHaveLength(QUANTITY_TO_SAVE);
  });

  it("should find an animal by its id", async () => {
    const QUANTITY_TO_SAVE = 2;
    Array.from({ length: QUANTITY_TO_SAVE }).forEach(async () => {
      const animal = Animal.create(createAnimalFixture);
      await instance.save(animal);
    });

    await instance.save(animalFixture);

    const animal = await instance.findById(animalFixture.id);
    expect(animal).not.toBeNull();
    expect(animal).toHaveProperty("id", animalFixture.id);
  });

  it("should not find any animals when id does not exist", async () => {
    const QUANTITY_TO_SAVE = 3;
    Array.from({ length: QUANTITY_TO_SAVE }).forEach(async () => {
      const animal = Animal.create(createAnimalFixture);
      await instance.save(animal);
    });

    const output = await instance.findById("inexistent_id");
    expect(output).toBeNull();
  });
});
