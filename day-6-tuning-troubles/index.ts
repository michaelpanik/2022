import path from "path";
import { fileToString } from "../helpers";

export default async function main(inputFileName: string) {
  const input: string = await fileToString(
    path.resolve(__dirname, inputFileName)
  );

  let charsBeforeSop: number = 0;
  const stringBuffer: string[] = input.split("");
  let previousChars: string[] = [];

  for (let char of stringBuffer) {
    charsBeforeSop++;
    if (previousChars.length < 14) {
      previousChars.push(char);
      continue;
    }

    if (previousChars.length !== new Set(previousChars).size) {
      previousChars.shift();
      previousChars.push(char);
      continue;
    } else {
      break;
    }
    // if (!previousChars.includes(char)) {
    //   previousChars.push(char);
    //   return;
    // }

    //   charsBeforeSop = i + 1;
    //   return;
    // }
  }

  return charsBeforeSop - 1;
}

(async () => {
  console.log(await main("input.txt"));
})();
