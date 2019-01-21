const readlineSync = require("readline-sync");

export const input = options => {
  const {
    multiline = false,
    question = "",
    preprocess = x => x,
    terminate = x => x === ""
  } = options;

  if (!multiline) {
    return preprocess(readlineSync.question(question));
  }

  const responses = [];
  let response = input({ question, preprocess });

  while (!terminate(response)) {
    responses.push(response);
    response = input({ preprocess });
  }

  return responses;
};
