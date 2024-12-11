import crypto from "node:crypto";

export type CreateAnimalData = {
  name?: string;
  age?: number;
  history?: string;
  observations?: string;
};

export type WithAnimalData = {
  id: string;
  isAdopted: boolean;
  name?: string;
  age?: number;
  history?: string;
  observations?: string;
};

export class Animal {
  private constructor(
    private _id: string,
    private _isAdopted: boolean,
    private _name?: string,
    private _age?: number,
    private _history?: string,
    private _observations?: string
  ) {}

  public get id(): string {
    return this._id;
  }

  public get isAdopted(): boolean {
    return this._isAdopted;
  }

  public get name(): string | undefined {
    return this._name;
  }

  public get age(): number | undefined {
    return this._age;
  }

  public get history(): string | undefined {
    return this._history;
  }

  public get observations(): string | undefined {
    return this._observations;
  }

  public markAsAdopted(): void {
    this._isAdopted = true;
  }

  public static create(data: CreateAnimalData): Animal {
    const animal = new Animal(
      crypto.randomUUID(),
      false,
      data.name,
      data.age,
      data.history,
      data.observations
    );

    return animal;
  }

  public static with(data: WithAnimalData): Animal {
    const animal = new Animal(
      data.id,
      data.isAdopted,
      data.name,
      data.age,
      data.history,
      data.observations
    );

    return animal;
  }
}
