import { Animal } from "../entity/animal";

export interface AnimalGateway {
  save(animal: Animal): Promise<void>;

  findAll(): Promise<Readonly<Animal[]>>;

  findById(id: string): Promise<Readonly<Animal | null>>;
}
