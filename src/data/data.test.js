import { emblem, database, potentialAllies } from "./index";

describe("emblem()", () => {
  it("should return correct emblem given kingdom", () => {
    expect(emblem(database[0].name)).toBe(database[0].emblem);
    expect(emblem(database[2].name)).toBe(database[2].emblem);
    expect(emblem(database[4].name)).toBe(database[4].emblem);
  });
});

describe("potentialAllies()", () => {
  it("should return all kingdoms except the given", () => {
    const output = potentialAllies(database[0].name);
    expect(output).toHaveLength(database.length - 1);
    expect(
      output.find(kingdom => kingdom.name === database[0].name)
    ).toBeUndefined();
  });
});
