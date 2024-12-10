import { Animal } from "../../domain/animal/entity/animal";
import { AnimalGateway } from "../../domain/animal/gateway/animal.gateway";
import { UseCase } from "../use-case";

type FindAllAnimalsInputDto = void;

type FindAllAnimalsOutputDto = {
  animals: Readonly<Animal[]>;
};

export class FindAllAnimalsUseCase
  implements UseCase<FindAllAnimalsInputDto, FindAllAnimalsOutputDto>
{
  private constructor(private readonly animalGateway: AnimalGateway) {}

  public static create(animalGateway: AnimalGateway): FindAllAnimalsUseCase {
    return new FindAllAnimalsUseCase(animalGateway);
  }

  async execute(): Promise<FindAllAnimalsOutputDto> {
    const animals = await this.animalGateway.findAll();
    const output = this.presentOutput(animals);
    return output;
  }

  private presentOutput(animals: Readonly<Animal[]>): FindAllAnimalsOutputDto {
    const output: FindAllAnimalsOutputDto = {
      animals,
    };

    return output;
  }
}
