import { any } from "./index";

describe("any()", () => {
  it("should return random elements from list", () => {
    const input = ["a", "b", "c", "d"];
    const output = any(3)(input);

    expect(output).toHaveLength(3);
    output.forEach(letter => input.indexOf(letter) !== -1);
  });
});
