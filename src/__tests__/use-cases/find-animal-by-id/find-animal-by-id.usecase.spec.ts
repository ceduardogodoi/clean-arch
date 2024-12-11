import { describe, it, beforeEach, expect } from "vitest";
import { FindAnimalByIdUseCase } from "../../../use-cases/find-animal-by-id/find-animal-by-id.usecase";
import { AnimalRepositoryMemory } from "../../../infra/repositories/animal.repository.memory";
import { animalFixture, createAnimalFixture } from "../../_fixtures/animal";
import { Animal } from "../../../domain/animal/entity/animal";

describe("Find animal by id use case", () => {
  let animalGateway: AnimalRepositoryMemory;
  let instance: FindAnimalByIdUseCase;
  beforeEach(() => {
    animalGateway = AnimalRepositoryMemory.create();
    instance = FindAnimalByIdUseCase.create(animalGateway);
  });

  it("should not find any animals when id does not exist", async () => {
    const QUANTITY_TO_SAVE = 3;
    Array.from({ length: QUANTITY_TO_SAVE }).forEach(async () => {
      const animal = Animal.create(createAnimalFixture);
      await animalGateway.save(animal);
    });

    const output = await instance.execute({ id: "inexistent_id" });
    expect(output).toBeNull();
  });

  it("should find an animal when id exists", async () => {
    const QUANTITY_TO_SAVE = 2;
    Array.from({ length: QUANTITY_TO_SAVE }).forEach(async () => {
      const animal = Animal.create(createAnimalFixture);
      await animalGateway.save(animal);
    });

    await animalGateway.save(animalFixture);

    const output = await instance.execute({
      id: animalFixture.id,
    });
    expect(output).not.toBeNull();
    expect(output).toHaveProperty("id", animalFixture.id);
  });
});
