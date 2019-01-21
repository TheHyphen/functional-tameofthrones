import { any, isMessageValid, determineAllies, uniqueAllies } from "./index";
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
  it("should return false if text has no emblem", () => {
    const input = {
      text: `pre ${database[1].emblem} post`,
      ally: database[0].name,
      kingdom: "Winterfell"
    };
    expect(isMessageValid(input)).toBe(false);
  });
});

describe("uniqueAllies()", () => {
  it("should return only unique allies", () => {
    const input = [
      {
        kingdom: "kingdom1",
        ally: "ally1"
      },
      {
        kingdom: "kingdom2",
        ally: "ally1"
      },
      {
        kingdom: "kingdom3",
        ally: "ally1"
      },
      {
        kingdom: "kingdom2",
        ally: "ally2"
      },
      {
        kingdom: "kingdom3",
        ally: "ally2"
      },
      {
        kingdom: "kingdom3",
        ally: "ally3"
      }
    ];
    const output = uniqueAllies(input);
    expect(output).toEqual([
      {
        kingdom: "kingdom1",
        ally: "ally1"
      },
      {
        kingdom: "kingdom2",
        ally: "ally2"
      },
      {
        kingdom: "kingdom3",
        ally: "ally3"
      }
    ]);
  });
});

describe("determineAllies()", () => {
  it("should return allies from list of messages", () => {
    const input = [
      {
        kingdom: "kingdom1",
        ally: "ally1"
      },
      {
        kingdom: "kingdom1",
        ally: "ally2"
      },
      {
        kingdom: "kingdom2",
        ally: "ally3"
      },
      {
        kingdom: "kingdom3",
        ally: "ally4"
      }
    ];
    const output = determineAllies(input);
    expect(output).toEqual([
      { kingdom: "kingdom1", allies: ["ally1", "ally2"] },
      { kingdom: "kingdom2", allies: ["ally3"] },
      { kingdom: "kingdom3", allies: ["ally4"] }
    ]);
  });
});
