import { Animal } from "../../domain/animal/entity/animal";
import { AnimalGateway } from "../../domain/animal/gateway/animal.gateway";

export class AnimalRepositoryMemory implements AnimalGateway {
  #animals: Animal[] = [];

  private constructor() {}

  public static create(): AnimalRepositoryMemory {
    return new AnimalRepositoryMemory();
  }

  public async save(animal: Animal): Promise<void> {
    this.#animals.push(animal);
  }

  public async findAll(): Promise<Animal[]> {
    return this.#animals;
  }

  public async findById(id: string): Promise<Animal | null> {
    const animal = this.#animals.find((_animal) => _animal.id === id) ?? null;
    return animal;
  }

  async markAnimalAsAdopted(id: string): Promise<Animal | null> {
    const animal = this.#animals.find((_animal) => _animal.id === id);
    if (animal == null) return null;

    animal.markAsAdopted();
    return animal;
  }
}
