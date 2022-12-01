import * as path from "path";
import { fileToString } from "../helpers";

async function main() {
  const input: string = await fileToString(
    path.resolve(__dirname, "input.txt")
  );
  const calorieData: string[] = input.split("\n");

  let caloriesPerElf: number[] = [];

  let i = 0;

  for (const calories of calorieData) {
    if (calories === "") {
      caloriesPerElf.push(i);
      i = 0;
    } else {
      i += Number(calories);
    }
  }

  const caloriesSorted = caloriesPerElf.sort((a, b) => (a > b ? -1 : 0));
  const top3Summed = caloriesSorted.slice(0, 3).reduce((a, b) => a + b);
  console.log(top3Summed);
}

main();
