import main from "./index";
import { expect, test } from "@jest/globals";

test("Day 6", async () => {
  expect(await main("test_input1.txt")).toBe(19);
  expect(await main("test_input2.txt")).toBe(23);
  expect(await main("test_input3.txt")).toBe(23);
  expect(await main("test_input4.txt")).toBe(29);
  expect(await main("test_input5.txt")).toBe(26);
});
