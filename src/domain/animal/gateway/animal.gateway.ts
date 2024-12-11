import { Animal } from "../entity/animal";

export interface AnimalGateway {
  save(animal: Animal): Promise<void>;

  findAll(): Promise<Animal[]>;

  findById(id: string): Promise<Animal | null>;

  markAnimalAsAdopted(id: string): Promise<Animal | null>;
}
