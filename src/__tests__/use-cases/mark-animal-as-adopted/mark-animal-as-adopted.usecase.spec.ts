import { describe, expect, it } from "vitest";
import { AnimalRepositoryMemory } from "../../../infra/repositories/animal.repository.memory";
import { animalFixture } from "../../_fixtures/animal";
import { MarkAnimalAsAdoptedUseCase } from "../../../use-cases/mark-animal-as-adopted/mark-animal-as-adopted.usecase";

describe("Mark animal as adopted use case", () => {
  it("should return null when id does not exist", async () => {
    const animalGateway = AnimalRepositoryMemory.create();
    await animalGateway.save(animalFixture);

    const markAnimalAsAdoptedUseCase =
      MarkAnimalAsAdoptedUseCase.create(animalGateway);

    const animal = await markAnimalAsAdoptedUseCase.execute({
      id: "inexistent_id",
    });

    expect(animal).toBeNull();
  });

  it("should have animal in an adopted state", async () => {
    const animalGateway = AnimalRepositoryMemory.create();
    await animalGateway.save(animalFixture);

    const markAnimalAsAdoptedUseCase =
      MarkAnimalAsAdoptedUseCase.create(animalGateway);

    const animal = await markAnimalAsAdoptedUseCase.execute({
      id: animalFixture.id,
    });

    expect(animal).toHaveProperty("isAdopted", true);
  });
});
