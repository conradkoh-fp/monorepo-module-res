import * as _ from "lodash-es";
export function TranslationProvider() {
  // TODO: Implement this
}

export function useTranslation() {
  // TODO: Implement this
}

export function test() {
  const users = [
    { name: "Alice", hobbies: ["reading", "hiking"] },
    { name: "Bob", hobbies: ["cooking", "gaming"] },
  ];

  const hobbies = _.flatMap(users, (user) => user.hobbies);
  return hobbies;
}
