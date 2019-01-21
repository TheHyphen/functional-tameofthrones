const readlineSync = require("readline-sync");

export const input = options => {
  const { multiline = false, question = "", preprocess = x => x, validate = () => true } = options;

  if (!multiline) {
    const result = readlineSync.question(question);
    if (result === "") {
      return result;
    }
    return validate(result)
      ? preprocess(result)
      : input({ ...options, question: "Invalid input, try again:\n" });
  }

  const responses = [];
  let response = input({ question, preprocess, validate });

  while (response !== "") {
    responses.push(response);
    response = input({ preprocess, validate });
  }

  return responses;
};
