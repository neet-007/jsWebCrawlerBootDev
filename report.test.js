const { sortPages } = require("./report.js");
const { test, expect } = require("@jest/globals");

test("sort pages 1 page", () => {
	const input = { "https://example": 3 };
	const actual = sortPages(input);
	const expected = [["https://example", 3]];
	expect(actual).toEqual(expected);
})


test("sort pages 2 page", () => {
	const input = { "https://example/path": 1, "https://example": 3 };
	const actual = sortPages(input);
	const expected = [["https://example", 3], ["https://example/path", 1]];
	expect(actual).toEqual(expected);
})
