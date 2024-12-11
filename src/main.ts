import { AnimalRepositoryMemory } from "./infra/repositories/animal.repository.memory";
import { CreateAnimalUseCase } from "./use-cases/create-animal/create-animal.usecase";
import { FindAllAnimalsUseCase } from "./use-cases/find-all-animals/find-all-animals.usecase";
import { FindAnimalByIdUseCase } from "./use-cases/find-animal-by-id/find-animal-by-id.usecase";

async function main(): Promise<void> {
  const animalRepository = AnimalRepositoryMemory.create();

  const createAnimalUseCase = CreateAnimalUseCase.create(animalRepository);
  const createAnimalUseCaseResult = await createAnimalUseCase.execute({
    name: "First",
    age: 1,
    history: "First history",
    observations: "First observation",
  });
  console.log("createAnimal::", createAnimalUseCaseResult.id);
  const createAnimalUseCaseResult2 = await createAnimalUseCase.execute({
    name: "Second",
    age: 2,
    history: "Second history",
    observations: "Second observation",
  });
  console.log("createAnimal2::", createAnimalUseCaseResult2.id);

  const findAllAnimalsUseCase = FindAllAnimalsUseCase.create(animalRepository);
  const findAllAnimalsUseCaseResult = await findAllAnimalsUseCase.execute();
  console.log("findAll::", findAllAnimalsUseCaseResult);

  const findAnimalByIdUseCase = FindAnimalByIdUseCase.create(animalRepository);
  const findAnimalByIdUseCaseResult = await findAnimalByIdUseCase.execute({
    id: createAnimalUseCaseResult.id,
  });
  console.log("ById::", findAnimalByIdUseCaseResult);
}

main();
