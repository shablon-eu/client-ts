import { describe, expect, test } from "vitest";
import { Client } from "./client.js";

describe("client", () => {
  test("require api key", () => {
    expect(() => new Client(undefined as any)).toThrowError("apiKey required");
  });
});
