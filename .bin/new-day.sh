DAY_NUMBER=$1
CHALLENGE_NAME=$2
DIR_NAME=day-$DAY_NUMBER-$CHALLENGE_NAME

mkdir $DIR_NAME
touch $DIR_NAME/input.txt $DIR_NAME/test_input.txt

echo "import path from \"path\";
import { fileToString } from \"../helpers\";

export default async function main(inputFileName: string) {
  const input: string = await fileToString(
    path.resolve(__dirname, inputFileName)
  );

  return;
}

(async () => {
  console.log(await main(\"input.txt\"));
})();
" >> $DIR_NAME/index.ts

echo "import main from \"./index\";
import { expect, test } from \"@jest/globals\";

test(\"Day $DAY_NUMBER\", async () => {
  expect(await main(\"test_input.txt\")).toBe(\"\");
});
" >> $DIR_NAME/index.test.ts