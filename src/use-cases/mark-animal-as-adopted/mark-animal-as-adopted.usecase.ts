import { Animal } from "../../domain/animal/entity/animal";
import { AnimalGateway } from "../../domain/animal/gateway/animal.gateway";
import { UseCase } from "../use-case";

export type MarkAnimalAsAdoptedInputDto = {
  id: string;
};

export type MarkAnimalAsAdoptedOutputDto = Animal | null;

export class MarkAnimalAsAdoptedUseCase
  implements UseCase<MarkAnimalAsAdoptedInputDto, MarkAnimalAsAdoptedOutputDto>
{
  private constructor(private readonly animalGateway: AnimalGateway) {}

  public static create(
    animalGateway: AnimalGateway
  ): MarkAnimalAsAdoptedUseCase {
    return new MarkAnimalAsAdoptedUseCase(animalGateway);
  }

  public async execute(
    input: MarkAnimalAsAdoptedInputDto
  ): Promise<MarkAnimalAsAdoptedOutputDto> {
    const output = await this.animalGateway.markAnimalAsAdopted(input.id);

    return output;
  }
}
