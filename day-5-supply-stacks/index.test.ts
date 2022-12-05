import main from "./index";
import { expect, test } from "@jest/globals";

test("Day 5", async () => {
  expect(await main("test_input.txt")).toBe("MCD");
});
