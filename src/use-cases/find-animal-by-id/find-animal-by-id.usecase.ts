import { Animal } from "../../domain/animal/entity/animal";
import { AnimalGateway } from "../../domain/animal/gateway/animal.gateway";
import { UseCase } from "../use-case";

export type FindAnimalByIdInputDto = Readonly<{
  id: string;
}>;

export type FindAnimalByIdOuputDto = Readonly<Animal | null>;

export class FindAnimalByIdUseCase
  implements UseCase<FindAnimalByIdInputDto, FindAnimalByIdOuputDto>
{
  private constructor(private readonly animalGateway: AnimalGateway) {}

  public static create(
    animalGateway: AnimalGateway
  ): Readonly<FindAnimalByIdUseCase> {
    return Object.freeze(new FindAnimalByIdUseCase(animalGateway));
  }

  async execute(
    input: FindAnimalByIdInputDto
  ): Promise<FindAnimalByIdOuputDto> {
    const output = await this.animalGateway.findById(input.id);
    return output;
  }
}
