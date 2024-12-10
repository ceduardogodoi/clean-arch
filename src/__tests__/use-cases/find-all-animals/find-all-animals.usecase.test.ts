import { describe, it, expect } from "vitest";
import { FindAllAnimalsUseCase } from "../../../use-cases/find-all-animals/find-all-animals.usecase";
import { AnimalRepositoryMemory } from "../../../infra/repositories/animal.repository.memory";

describe("Find all animals use case", () => {
  it("should not find any animals and return an empty array", async () => {
    const animalGateway = AnimalRepositoryMemory.create();
    const instance = FindAllAnimalsUseCase.create(animalGateway);
    const output = await instance.execute();
    expect(output.animals).toHaveLength(0);
  });
});
