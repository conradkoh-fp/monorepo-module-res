import * as translation from "shared/utils/translation";
import { test } from "shared/utils/translation";

import { Button } from "shared/components/Button";
export function main() {
  const val = translation.test(); //opt1: import from root
  const val2 = test(); //opt2: import directly
  console.log({ val });
  console.log({ val2 });
}
main();
