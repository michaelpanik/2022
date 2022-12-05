import path from "path";
import { fileToString } from "../helpers";

function getPriority(item: string): number {
  const charCode = item.charCodeAt(0);
  return item.toLowerCase() === item ? charCode - 96 : charCode - 38;
}

async function main() {
  const input: string = await fileToString(
    path.resolve(__dirname, "input.txt")
  );

  const rucksacks: string[] = input.split("\n");

  const groups: string[][] = [];
  let currentGroup = 0;
  let currentSack = 0;

  for (let rucksack of rucksacks) {
    if (Array.isArray(groups[currentGroup])) {
      groups[currentGroup].push(rucksack);
    } else {
      groups[currentGroup] = [rucksack];
    }

    if (groups[currentGroup].length < 3) {
      currentSack++;
    } else {
      currentSack = 0;
      currentGroup++;
    }
  }
  let prioritySum = 0;

  for (let group of groups) {
    const commonItem: string = group[0]
      .split("")
      .filter(
        (item) =>
          group[1].split("").includes(item) && group[2].split("").includes(item)
      )[0];
    prioritySum += getPriority(commonItem);
  }

  console.log(prioritySum);
}

main();
