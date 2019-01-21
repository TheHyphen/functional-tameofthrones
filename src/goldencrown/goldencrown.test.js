import {
  characterHistogram,
  characterFrequency,
  messageHasEmblem,
  validateInput,
  preprocessInput
} from "./";
import { database } from "./../data";
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

describe("messageHasEmblem()", () => {
  it("should return if the message has emblem", () => {
    expect(messageHasEmblem("message for owls", "owl")).toBe(true);
    expect(messageHasEmblem("message for owls", "fish")).toBe(false);
  });
});

describe("validateInput()", () => {
  it("should check if isKingdom and message is after the comma", () => {
    expect(validateInput(`${database[0].name}, message for the kingdom`)).toBe(
      true
    );
    expect(validateInput(`nonexistent, message for the kingdom`)).toBe(false);
    expect(validateInput(`${database[0].name} message for the kingdom`)).toBe(
      false
    );
  });
});

describe("preprocessInput()", () => {
  it("should split at the first comma", () => {
    expect(preprocessInput("hey, there")).toEqual(["hey", "there"]);
    expect(preprocessInput("hey, there, how, are, you")).toEqual([
      "hey",
      "there, how, are, you"
    ]);
  });
});
