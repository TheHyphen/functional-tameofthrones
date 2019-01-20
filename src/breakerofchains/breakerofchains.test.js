import { any, isMessageValid } from "./index";
import { database } from "./../data";
describe("any()", () => {
  it("should return random elements from list", () => {
    const input = ["a", "b", "c", "d"];
    const output = any(3)(input);

    expect(output).toHaveLength(3);
    output.forEach(letter => input.indexOf(letter) !== -1);
  });
});

describe("isMessageValid()", () => {
  it("should return true if text has emblem", () => {
    const input = {
      text: `pre ${database[0].emblem} post`,
      ally: database[0].name,
      kingdom: "Winterfell"
    };
    expect(isMessageValid(input)).toBe(true);
  });
  it("should return false if text has emblem", () => {
    const input = {
      text: `pre ${database[1].emblem} post`,
      ally: database[0].name,
      kingdom: "Winterfell"
    };
    expect(isMessageValid(input)).toBe(false);
  });
});
