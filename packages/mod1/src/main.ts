import { translation } from "shared";
import { test } from "shared/dist/utils/translation";
export function main() {
  const val = translation.test(); //opt1: import from root
  const val2 = test(); //opt2: import directly
  console.log({ val });
  console.log({ val2 });
}
main();
