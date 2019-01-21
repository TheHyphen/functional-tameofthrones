import * as R from "ramda";
import { messageHasEmblem } from "../goldencrown";
import { emblem, isKingdom } from "./../data";
import { input } from "../input";

export const randomBelow = max => Math.floor(Math.random() * (max + 1));
export const randomIndex = R.compose(
  R.add(-1),
  randomBelow,
  R.length
);

export const takeRandomFromList = R.converge(
  R.converge(R.pair, [R.nth, R.flip(R.remove)(1)]),
  [
    R.compose(
      randomBelow,
      R.add(-1),
      R.length
    ),
    R.identity
  ]
);

export const any = R.curry((size, messages) => {
  const [removedMessage, newMessagesList] = takeRandomFromList(messages);
  const len = R.min(size, messages.length);
  return len - 1 > 0
    ? R.flatten([removedMessage, any(len - 1, newMessagesList)])
    : [removedMessage];
});

export const isMessageValid = R.converge(messageHasEmblem, [
  R.prop("text"),
  R.compose(
    emblem,
    R.prop("ally")
  )
]);

// a message is a labelled text
export const labelText = R.curry((kingdom, ally, text) => ({
  kingdom,
  ally,
  text
}));

export const uniqueAllies = R.uniqBy(R.prop("ally"));

export const determineAllies = R.compose(
  R.map(([kingdom, allies]) => ({ kingdom, allies })),
  R.toPairs,
  R.mapObjIndexed(allies => R.map(R.prop("ally"), allies)),
  R.groupBy(R.prop("kingdom"))
);

export const alliesCount = R.compose(
  R.length,
  R.prop("allies")
);
export const highestAlliesCount = R.compose(
  alliesCount,
  R.last,
  R.sortBy(alliesCount)
);

export const tiedKingdoms = R.curry((numberOfAllies, results) =>
  R.filter(result => R.equals(alliesCount(result), numberOfAllies))(results)
);

export const validateInput = R.compose(
  R.all(isKingdom),
  R.map(R.compose(R.trim)),
  R.split(",")
);

export const preprocessInput = R.compose(
  R.map(R.trim),
  R.split(",")
);

export const collecInput = () =>
  input({
    question:
      "Enter kingdoms separated with comma: <kingdom1>, <kingdom2>, ...",
    validate: validateInput,
    preprocess: preprocessInput
  });

export const output = R.converge(R.pair, [R.prop("kingdom"), R.prop("allies")]);
