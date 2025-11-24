import { NumberSource } from "./NumberSource.ts";
import { mean, median, mode } from "./statistics.ts";

export class Average {
  constructor(private numberSource: NumberSource) {}

  public async computeMeanOfFile(): Promise<number> {
    const numbers: Array<number> = await this.numberSource.readNumbers();
    return mean(numbers);
  }

  public async computeMedianOfFile(): Promise<number> {
    const numbers: Array<number> = await this.numberSource.readNumbers();
    return median(numbers);
  }

  public async computeModeOfFile(): Promise<Array<number>> {
    const numbers: Array<number> = await this.numberSource.readNumbers();
    return mode(numbers);
  }
}
