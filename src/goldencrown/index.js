import { compose, reduce, split } from "ramda";
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
