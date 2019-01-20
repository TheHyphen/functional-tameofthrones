import * as R from "ramda";
import { messageHasEmblem } from "../goldencrown";
import { emblem } from "./../data";

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