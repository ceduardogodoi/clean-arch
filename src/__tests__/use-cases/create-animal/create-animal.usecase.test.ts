import { describe, it, expect, vi } from "vitest";
import { CreateAnimalUseCase } from "../../../use-cases/create-animal/create-animal.usecase";
import { AnimalRepositoryMemory } from "../../../infra/repositories/animal.repository.memory";
import { createAnimalInputDtoFixture } from "../../fixtures/animal";
import { Animal } from "../../../domain/animal/entity/animal";

vi.mock("../../../infra/repositories/animal.repository.memory", () => {
  function AnimalRepositoryMemoryFixture() {
    return {
      async save(_: Animal): Promise<void> {},
    };
  }

  AnimalRepositoryMemoryFixture.create = AnimalRepositoryMemoryFixture;

  return {
    AnimalRepositoryMemory: AnimalRepositoryMemoryFixture,
  };
});

describe("Create animal use case", () => {
  it("should create an animal and return its id", async () => {
    const animalGateway = AnimalRepositoryMemory.create();
    const spy = vi.spyOn(animalGateway, "save");
    const instance = CreateAnimalUseCase.create(animalGateway);
    const output = await instance.execute(createAnimalInputDtoFixture);

    expect(spy).toHaveBeenCalled();
    expect(output).toEqual({
      id: output.id,
    });
  });
});
