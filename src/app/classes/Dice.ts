export class Dice {
  public value: number;
  public holdBack: boolean = false;

  constructor() {
    this.value = Math.random();
  }
}

