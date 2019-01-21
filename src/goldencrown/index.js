import * as R from "ramda";
import { isKingdom, emblem } from "./../data";
import { input } from "./../input";

export const characterHistogram = R.compose(
  R.reduce(
    (frequency, character) => ({
      ...frequency,
      [character]: (frequency[character] || 0) + 1
    }),
    {}
  ),
  R.split("")
);

export const characterFrequency = R.curry((character, string) =>
  R.compose(
    R.length,
    R.match(new RegExp(character, "g"))
  )(string)
);

export const messageHasEmblem = (message, emblem) =>
  R.compose(
    R.all(
      ([character, frequency]) =>
        characterFrequency(character, message) >= frequency
    ),
    R.toPairs,
    characterHistogram
  )(emblem);

export const validateInput = R.allPass([
  R.compose(
    R.gte(2),
    R.length,
    R.split(",")
  ),
  R.compose(
    isKingdom,
    R.trim,
    R.head,
    R.split(",")
  )
]);

export const preprocessInput = R.compose(
  R.map(
    R.compose(
      R.toLower,
      R.trim
    )
  ),
  R.init,
  R.split(/,(.+)/)
);

export const collectInput = () =>
  input({
    multiline: true,
    question: "Enter Kingdom and message: <kingdom>, <message>\n",
    validate: validateInput,
    preprocess: preprocessInput
  });

export const output = R.converge(R.pair, [
  R.length,
  R.compose(
    R.join(", "),
    R.map(R.head)
  )
]);

export const run = R.filter(
  R.converge(messageHasEmblem, [
    R.last,
    R.compose(
      emblem,
      R.head
    )
  ])
);

export const main = R.compose(
  output,
  run,
  collectInput
);

export default main;
