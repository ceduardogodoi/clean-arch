import { Animal, CreateAnimalData } from "../../domain/animal/entity/animal";
import { CreateAnimalInputDto } from "../../use-cases/create-animal/create-animal.usecase";

export const animalFixture = Animal.with({
  id: "6dfff717-103b-4a2e-9291-f94141334405",
  isAdopted: false,
  name: "Animal",
  age: 0.5,
  history: "Animal history",
  observations: "Animal observations",
});

export const createAnimalFixture: CreateAnimalData = {
  name: "Create Animal",
  age: 1,
  history: "Create Animal history",
  observations: "Create Animal observations",
};

export const createAnimalInputDtoFixture: CreateAnimalInputDto = {
  name: "Create Animal Input Dto",
  age: 1,
  history: "Create Animal Input Dto history",
  observations: "Create Animal Input Dto observations",
};
