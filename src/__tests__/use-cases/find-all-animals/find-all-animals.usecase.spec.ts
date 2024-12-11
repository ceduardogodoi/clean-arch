import { describe, it, expect, vi, afterEach } from "vitest";
import { FindAllAnimalsUseCase } from "../../../use-cases/find-all-animals/find-all-animals.usecase";
import { AnimalRepositoryMemory } from "../../../infra/repositories/animal.repository.memory";
import { Animal } from "../../../domain/animal/entity/animal";
import { animalFixture, createAnimalFixture } from "../../_fixtures/animal";

describe("Find all animals use case", () => {
  afterEach(() => {
    vi.resetModules();
  });

  it("should not find any animals and return an empty array", async () => {
    function AnimalRepositoryMemoryFixture(): Partial<AnimalRepositoryMemory> {
      const animals: Animal[] = [];
      const animalsFrozen = Object.freeze(animals);

      return {
        findAll: vi.fn().mockResolvedValue(animalsFrozen),
      };
    }

    AnimalRepositoryMemoryFixture.create = AnimalRepositoryMemoryFixture;

    vi.doMock("../../../infra/repositories/animal.repository.memory", () => {
      return {
        AnimalRepositoryMemory: AnimalRepositoryMemoryFixture,
      };
    });

    const { AnimalRepositoryMemory } = await import(
      "../../../infra/repositories/animal.repository.memory"
    );

    const QUANTITY_TO_SAVE = 0;

    const animalGateway = AnimalRepositoryMemory.create();
    const spy = vi.spyOn(animalGateway, "findAll");

    const instance = FindAllAnimalsUseCase.create(animalGateway);
    const output = await instance.execute();
    expect(output).toHaveLength(QUANTITY_TO_SAVE);
    expect(spy).toHaveBeenCalled();
  });

  it("should find all animals and return an them in the array", async () => {
    const animalGateway = AnimalRepositoryMemory.create();

    const QUANTITY_TO_SAVE = 2;
    Array.from({ length: QUANTITY_TO_SAVE }).forEach(async () => {
      const animal = Animal.create(createAnimalFixture);
      await animalGateway.save(animal);
    });

    await animalGateway.save(animalFixture);

    const instance = FindAllAnimalsUseCase.create(animalGateway);
    const output = await instance.execute();
    expect(output).toHaveLength(3);
    expect(output).toContainEqual(
      expect.objectContaining({
        id: animalFixture.id,
      })
    );
  });
});
