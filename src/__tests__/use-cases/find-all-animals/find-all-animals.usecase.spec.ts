import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { FindAllAnimalsUseCase } from "../../../use-cases/find-all-animals/find-all-animals.usecase";
import { AnimalRepositoryMemory } from "../../../infra/repositories/animal.repository.memory";
import { Animal } from "../../../domain/animal/entity/animal";
import { animalFixture, createAnimalFixture } from "../../_fixtures/animal";
import { AnimalRepositoryMemoryFixture } from "../../_fixtures/animal.respository.memory";

describe("Find all animals use case", () => {
  let animalGateway: AnimalRepositoryMemory;
  let instance: FindAllAnimalsUseCase;
  beforeEach(() => {
    vi.doMock("../../../infra/repositories/animal.repository.memory", () => {
      return {
        AnimalRepositoryMemory: AnimalRepositoryMemoryFixture,
      };
    });

    animalGateway = AnimalRepositoryMemory.create();
    instance = FindAllAnimalsUseCase.create(animalGateway);
  });

  afterEach(() => {
    vi.resetModules();
  });

  it("should not find any animals and return an empty array", async () => {
    const QUANTITY_TO_SAVE = 0;

    const spy = vi.spyOn(animalGateway, "findAll");

    const output = await instance.execute();
    expect(output).toHaveLength(QUANTITY_TO_SAVE);
    expect(spy).toHaveBeenCalled();
  });

  it("should find all animals and return an them in the array", async () => {
    const QUANTITY_TO_SAVE = 2;
    Array.from({ length: QUANTITY_TO_SAVE }).forEach(async () => {
      const animal = Animal.create(createAnimalFixture);
      await animalGateway.save(animal);
    });

    await animalGateway.save(animalFixture);

    const output = await instance.execute();
    expect(output).toHaveLength(3);
    expect(output).toContainEqual(
      expect.objectContaining({
        id: animalFixture.id,
      })
    );
  });
});
