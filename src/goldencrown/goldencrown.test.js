import { characterHistogram, characterFrequency } from "./";

describe("characterHistogram", () => {
  it("should count characters in a string", () => {
    expect(characterHistogram("something")).toEqual({
      s: 1,
      o: 1,
      m: 1,
      e: 1,
      t: 1,
      h: 1,
      i: 1,
      n: 1,
      g: 1
    });
    expect(characterHistogram("abbcccdddd")).toEqual({
      a: 1,
      b: 2,
      c: 3,
      d: 4
    });
    expect(characterHistogram("")).toEqual({});
  });
});

describe("characterFrequency()", () => {
  it("should get number of occurences of a character in a string", () => {
    expect(characterFrequency("a", "abcdabcdabcd")).toBe(3);
    expect(characterFrequency("b", "abcdabcdabcd")).toBe(3);
    expect(characterFrequency("", "abcdabcdabcd")).toBe(13);
  });
});
