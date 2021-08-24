export class Dice {
  public value: number | undefined;
  public holdBack: boolean = false;

  constructor() {
    this.value = Math.random();
  }
}

