const readlineSync = require("readline-sync");

const input = options => {
  const {
    multiline = false,
    question = "",
    preprocess = x => x,
    validate = () => true
  } = options;

  if (!multiline) {
    const result = readlineSync.question(question);

    return validate(result) || result === ""
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