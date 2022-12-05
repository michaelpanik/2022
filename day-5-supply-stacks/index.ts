import path from "path";
import { fileToString } from "../helpers";

function diagramToStacks(diagram: string) {
  const stacks: string[][] = [];

  diagram
    .split("\n")
    .slice(0, -1)
    .map((line: string) => {
      line?.match(/.{1,4}/g)?.forEach((crate: string, i: number) => {
        crate = crate.trim().replace(/\[|\]/g, "");

        if (!crate) return;

        if (Array.isArray(stacks[i])) {
          stacks[i].push(crate);
        } else {
          stacks[i] = [crate];
        }
      });
    });

  return stacks;
}

function movesListToMoves(
  movesList: string[]
): Array<[number, number, number]> {
  return movesList.map((line: string) => {
    const segments = line.split(" ");
    return [Number(segments[1]), Number(segments[3]), Number(segments[5])];
  });
}

export default async function main(inputFileName: string) {
  const input: string = await fileToString(
    path.resolve(__dirname, inputFileName)
  );
  const [diagram, movesList] = input.split("\n\n");

  const stacks = diagramToStacks(diagram);
  const moves: [number, number, number][] = movesListToMoves(
    movesList.split("\n")
  );

  moves.forEach((move) => {
    const [a, b, c]: number[] = move;
    const removedElements = stacks[b - 1].splice(0, a);
    stacks[c - 1].unshift(...removedElements);
  });

  return stacks.map((stack) => stack[0]).join("");
}

(async () => {
  console.log(await main("input.txt"));
})();
