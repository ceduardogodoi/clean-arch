import { Animal } from "../../domain/animal/entity/animal";
import { AnimalGateway } from "../../domain/animal/gateway/animal.gateway";
import { UseCase } from "../use-case";

export type CreateAnimalInputDto = {
  name?: string;
  age?: number;
  history?: string;
  observations?: string;
};

export type CreateAnimalOutputDto = {
  id: string;
};

export class CreateAnimalUseCase
  implements UseCase<CreateAnimalInputDto, CreateAnimalOutputDto>
{
  private constructor(private readonly animalGateway: AnimalGateway) {}

  public static create(
    animalGateway: Readonly<AnimalGateway>
  ): Readonly<CreateAnimalUseCase> {
    return Object.freeze(new CreateAnimalUseCase(animalGateway));
  }

  public async execute(input: CreateAnimalInputDto): Promise<CreateAnimalOutputDto> {
    const animal = Animal.create({
      name: input.name,
      age: input.age,
      history: input.history,
      observations: input.observations,
    });

    await this.animalGateway.save(animal);

    const output = this.presentOutput(animal);
    return output;
  }

  private presentOutput(animal: Animal): CreateAnimalOutputDto {
    const output: CreateAnimalOutputDto = {
      id: animal.id,
    };

    return output;
  }
}
