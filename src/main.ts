import "reflect-metadata";
import { container } from "tsyringe";
import { AnimalRepositoryMemory } from "./infra/repositories/animal.repository.memory";
import { CreateAnimalUseCase } from "./use-cases/create-animal/create-animal.usecase";

async function main(): Promise<void> {
  container.register("AnimalGateway", {
    useValue: AnimalRepositoryMemory.create(),
  });

  const createAnimalUseCase = container.resolve(CreateAnimalUseCase);
  const createAnimalUseCaseResult = await createAnimalUseCase.execute({
    name: "First",
    age: 1,
    history: "First history",
    observations: "First observation",
  });
  console.log(createAnimalUseCaseResult);
}

main();
