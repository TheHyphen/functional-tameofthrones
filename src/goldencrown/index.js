import { compose, match, length, reduce, split, curry } from "ramda";
export const characterHistogram = compose(
  reduce(
    (frequency, character) => ({
      ...frequency,
      [character]: (frequency[character] || 0) + 1
    }),
    {}
  ),
  split("")
);

export const characterFrequency = curry((character, string) =>
  compose(
    length,
    match(new RegExp(character, "g"))
  )(string)
);
