/// <reference path="./deno.d.ts" />
import { Average } from "./average.ts";
import { NumberSource } from "./NumberSource.ts";

function assertEquals(actual: unknown, expected: unknown, msg?: string) {
  if (actual !== expected) {
    throw new Error(msg || `Assertion failed: expected ${expected} but got ${actual}`);
  }
}

// (Removed FakeNumberSource per user request; keeping only stubs & mock.)

// Stub (hard-coded): always returns the same numbers.
class HardCodedStubNumberSource implements NumberSource {
  async readNumbers(): Promise<number[]> {
    return [10, 20, 30];
  }
}

// Stub (configurable via constructor): returns provided numbers.
class ConfigurableStubNumberSource implements NumberSource {
  constructor(private numbers: number[]) {}
  async readNumbers(): Promise<number[]> {
    return this.numbers;
  }
}

// Mock: returns fixed numbers and tracks how many times it was called.
class MockNumberSource implements NumberSource {
  private callCount = 0;
  async readNumbers(): Promise<number[]> {
    this.callCount += 1;
    return [5, 5, 5, 5];
  }
  getCalls(): number {
    return this.callCount;
  }
}

// (Removed SpyFileAccess per user request.)

Deno.test("Stub (hard-coded) vs Stub (configurable) produce same mean", async () => {
  const hardStub = new HardCodedStubNumberSource();
  const configStub = new ConfigurableStubNumberSource([10, 20, 30]);
  const avgHard = new Average(hardStub);
  const avgConfig = new Average(configStub);
  const meanHard = await avgHard.computeMeanOfFile();
  const meanConfig = await avgConfig.computeMeanOfFile();
  assertEquals(meanHard, 20);
  assertEquals(meanConfig, 20);
  // Question for reflection: which is more readable? (Configurable variant is clearer when test data changes.)
});

Deno.test("Mock: verify readNumbers called exactly once", async () => {
  const mock = new MockNumberSource();
  const avg = new Average(mock);
  const result = await avg.computeMeanOfFile();
  assertEquals(result, 5); // mean of [5,5,5,5]
  assertEquals(mock.getCalls(), 1);
});

// (Removed Spy test.)
