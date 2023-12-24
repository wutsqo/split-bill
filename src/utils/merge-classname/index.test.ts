import { mergeClassname } from ".";

describe("mergeClassname", () => {
  it.each([
    ["combine two strings", "a b", "a", "b"],
    ["combine three strings", "a b c", "a", "b", "c"],
    ["combine two strings with empty string", "a b", "a", "", "b"],
    ["combine two strings with undefined", "a b", "a", undefined, "b"],
    ["combine two strings with null", "a b", "a", null, "b"],
    ["combine two strings with false", "a b", "a", false, "b"],
    ["combine two strings with true", "a b", "a", true, "b"],
    ["combine two strings with zero", "a b", "a", 0, "b"],
    ["combine two strings with number", "a b", "a", 1, "b"],
    ["combine two strings with object", "a b", "a", {}, "b"],
    ["combine two strings with array", "a b", "a", [], "b"],
    ["combine two strings with function", "a b", "a", () => {}, "b"],
  ])("%s", (_, expected, ...args) => {
    expect(mergeClassname(...args)).toBe(expected);
  });
});
