import * as R from "ramda";

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
