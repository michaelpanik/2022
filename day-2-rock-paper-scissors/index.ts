import * as path from "path";
import { fileToString } from "../helpers";

enum SHAPE {
  ROCK,
  PAPER,
  SCISSORS,
}

type Play = {
  shape: SHAPE;
  score: number;
  beatenBy: SHAPE;
  beats: SHAPE;
};

enum OUTCOME {
  WIN = 6,
  DRAW = 3,
  LOSE = 0,
}

const plays = new Map<SHAPE, Play>([
  [
    SHAPE.ROCK,
    {
      shape: SHAPE.ROCK,
      score: 1,
      beatenBy: SHAPE.PAPER,
      beats: SHAPE.SCISSORS,
    },
  ],
  [
    SHAPE.PAPER,
    {
      shape: SHAPE.PAPER,
      score: 2,
      beatenBy: SHAPE.SCISSORS,
      beats: SHAPE.ROCK,
    },
  ],
  [
    SHAPE.SCISSORS,
    {
      shape: SHAPE.SCISSORS,
      score: 3,
      beatenBy: SHAPE.ROCK,
      beats: SHAPE.PAPER,
    },
  ],
]);

function shapeSymbolToShape(shapeSymbol: string): SHAPE {
  switch (shapeSymbol) {
    case "a":
    case "x":
      return SHAPE.ROCK;
    case "b":
    case "y":
      return SHAPE.PAPER;
    case "c":
    case "z":
      return SHAPE.SCISSORS;
    default:
      throw new Error(`No such shape, ${shapeSymbol}`);
  }
}

function outcomeSymbolToOutcome(outcomeSymbol: string): OUTCOME {
  switch (outcomeSymbol) {
    case "x":
      return OUTCOME.LOSE;
    case "y":
      return OUTCOME.DRAW;
    case "z":
      return OUTCOME.WIN;
    default:
      throw new Error(`No such shape, ${outcomeSymbol}`);
  }
}

function calculateOutcome(play1: Play, play2: Play): number {
  if (play1 === play2) return OUTCOME.DRAW;

  if (play1.beatenBy === play2.shape) return OUTCOME.WIN;

  return OUTCOME.LOSE;
}

function getPlayForDesiredOutcome(
  play1: Play,
  desiredOutcome: OUTCOME
): Play | undefined {
  if (desiredOutcome == OUTCOME.DRAW) return play1;

  if (desiredOutcome == OUTCOME.WIN) {
    const beatenBy = plays.get(play1.beatenBy);
    if (beatenBy) return beatenBy;
  }

  if (desiredOutcome == OUTCOME.LOSE) {
    const beats = plays.get(play1.beats);
    if (beats) return beats;
  }
}

async function main() {
  const input: string = await fileToString(
    path.resolve(__dirname, "input.txt")
  );
  const rpsRounds: string[] = input.toLowerCase().split("\n");

  let totalScore = 0;

  for (let round of rpsRounds) {
    const [player1Shape, desiredOutcome] = round.toLowerCase().split(" ");
    const play1 = plays.get(shapeSymbolToShape(player1Shape));

    if (play1) {
      const play2 = getPlayForDesiredOutcome(
        play1,
        outcomeSymbolToOutcome(desiredOutcome)
      );

      if (play2) {
        totalScore += calculateOutcome(play1, play2) + play2?.score;
      }
    }
  }

  console.log(totalScore);
}

main();
