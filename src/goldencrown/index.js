import {
  compose,
  match,
  length,
  reduce,
  split,
  curry,
  all,
  toPairs
} from "ramda";
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

export const messageHasEmblem = (message, emblem) =>
  compose(
    all(
      ([character, frequency]) =>
        characterFrequency(character, message) >= frequency
    ),
    toPairs,
    characterHistogram
  )(emblem);
