import { vi } from "vitest";
import { Animal } from "../../domain/animal/entity/animal";
import { AnimalRepositoryMemory } from "../../infra/repositories/animal.repository.memory";

function AnimalRepositoryMemoryFixture(): Partial<AnimalRepositoryMemory> {
  const animals: Animal[] = [];

  return {
    findAll: vi.fn().mockResolvedValue(animals),
  };
}

AnimalRepositoryMemoryFixture.create = AnimalRepositoryMemoryFixture;

export { AnimalRepositoryMemoryFixture };
