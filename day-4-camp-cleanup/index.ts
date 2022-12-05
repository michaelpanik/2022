import path from "path";
import { fileToString } from "../helpers";

async function main() {
  const input: string = await fileToString(
    path.resolve(__dirname, "input.txt")
  );
  const pairs = input.split("\n");

  let totalFullyContained = 0;

  for (let pair of pairs) {
    const [[min1, max1], [min2, max2]] = pair
      .split(",")
      .map((elf) => elf.split("-").map((e) => Number(e)));

    const range1 = Array(max1 - min1 + 1)
      .fill(min1)
      .map((x, y) => x + y);

    const range2 = Array(max2 - min2 + 1)
      .fill(min2)
      .map((x, y) => x + y);

    if (
      range1.some((e) => range2.includes(e)) ||
      range2.some((e) => range1.includes(e))
    ) {
      totalFullyContained++;
    }
  }

  console.log(totalFullyContained);
}

main();
