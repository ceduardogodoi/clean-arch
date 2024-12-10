import crypto from "node:crypto";

export type CreateAnimalData = {
  name?: string;
  age?: number;
  history?: string;
  observations?: string;
};

export class Animal {
  private constructor(
    readonly id: string,
    readonly isAdopted: boolean,
    readonly name?: string,
    readonly age?: number,
    readonly history?: string,
    readonly observations?: string
  ) {}

  public static create(data: CreateAnimalData): Readonly<Animal> {
    const animal = new Animal(
      crypto.randomUUID(),
      false,
      data.name,
      data.age,
      data.history,
      data.observations
    );

    return Object.freeze(animal);
  }

  public static with(data: Animal): Readonly<Animal> {
    const animal = new Animal(
      data.id,
      data.isAdopted,
      data.name,
      data.age,
      data.history,
      data.observations
    );

    return Object.freeze(animal);
  }
}
