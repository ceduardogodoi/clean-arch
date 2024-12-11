import { Animal } from "../../domain/animal/entity/animal";
import { AnimalGateway } from "../../domain/animal/gateway/animal.gateway";
import { UseCase } from "../use-case";

type FindAllAnimalsInputDto = void;

type FindAllAnimalsOutputDto = {
  id: string;
  isAdopted: boolean;
  name?: string;
  age?: number;
  history?: string;
  observations?: string;
}[];

export class FindAllAnimalsUseCase
  implements UseCase<FindAllAnimalsInputDto, FindAllAnimalsOutputDto>
{
  private constructor(private readonly animalGateway: AnimalGateway) {}

  public static create(animalGateway: AnimalGateway): FindAllAnimalsUseCase {
    return new FindAllAnimalsUseCase(animalGateway);
  }

  public async execute(): Promise<FindAllAnimalsOutputDto> {
    const animals = await this.animalGateway.findAll();
    const output = this.presentOutput(animals);
    return output;
  }

  private presentOutput(animals: Animal[]): FindAllAnimalsOutputDto {
    const output: FindAllAnimalsOutputDto = animals.map((animal) => {
      return {
        id: animal.id,
        isAdopted: animal.isAdopted,
        name: animal.name,
        age: animal.age,
        history: animal.history,
        observations: animal.observations,
      };
    });

    return output;
  }
}
