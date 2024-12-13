import { inject, injectable } from "tsyringe";
import { Animal } from "../../domain/animal/entity/animal";
import { AnimalGateway } from "../../domain/animal/gateway/animal.gateway";
import { UseCase } from "../use-case";

export type FindAnimalByIdInputDto = {
  id: string;
};

export type FindAnimalByIdOuputDto = {
  id: string;
  isAdopted: boolean;
  name?: string;
  age?: number;
  history?: string;
  observations?: string;
} | null;

@injectable()
export class FindAnimalByIdUseCase
  implements UseCase<FindAnimalByIdInputDto, FindAnimalByIdOuputDto>
{
  constructor(
    @inject("AnimalGateway")
    private readonly animalGateway: AnimalGateway
  ) {}

  public static create(animalGateway: AnimalGateway): FindAnimalByIdUseCase {
    return new FindAnimalByIdUseCase(animalGateway);
  }

  public async execute(
    input: FindAnimalByIdInputDto
  ): Promise<FindAnimalByIdOuputDto> {
    const animal = await this.animalGateway.findById(input.id);
    const output = this.presentOutput(animal);

    return output;
  }

  private presentOutput(animal: Animal | null): FindAnimalByIdOuputDto {
    if (animal == null) return null;

    return {
      id: animal.id,
      isAdopted: animal.isAdopted,
      name: animal.name,
      age: animal.age,
      history: animal.history,
      observations: animal.observations,
    };
  }
}
