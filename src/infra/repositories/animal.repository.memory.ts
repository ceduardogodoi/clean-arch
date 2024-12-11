import { Animal } from "../../domain/animal/entity/animal";
import { AnimalGateway } from "../../domain/animal/gateway/animal.gateway";

export class AnimalRepositoryMemory implements AnimalGateway {
  #animals: Animal[] = [];

  private constructor() {}

  public static create(): Readonly<AnimalRepositoryMemory> {
    return Object.freeze(new AnimalRepositoryMemory());
  }

  public async save(animal: Animal): Promise<void> {
    this.#animals.push(animal);
  }

  public async findAll(): Promise<Readonly<Animal[]>> {
    const animalsClone = structuredClone(this.#animals);
    const animals = Object.freeze(animalsClone);
    return animals;
  }

  public async findById(id: string): Promise<Readonly<Animal | null>> {
    const animal = this.#animals.find((_animal) => _animal.id === id) ?? null;
    const animalFrozen = Object.freeze(animal);
    return animalFrozen;
  }

  async markAnimalAsAdopted(id: string): Promise<Animal | null> {
    const animal = this.#animals.find((_animal) => _animal.id === id);
    if (animal == null) return null;

    animal.markAsAdopted();
    return animal;
  }
}
