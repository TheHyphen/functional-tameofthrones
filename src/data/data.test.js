import { emblem, database } from "./index";

describe("emblem()", () => {
  it("should return correct emblem given kingdom", () => {
    expect(emblem(database[0].name)).toBe(database[0].emblem);
    expect(emblem(database[2].name)).toBe(database[2].emblem);
    expect(emblem(database[4].name)).toBe(database[4].emblem);
  });
});
