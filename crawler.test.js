const { normalizeUrl } = require("./crawler.js");
const { test, expect } = require("@jest/globals");

test("normalizeUrl strip hostname path", () => {
	const input = "https://example/path";
	const actual = normalizeUrl(input);
	const expected = "example/path";
	expect(actual).toEqual(expected);
})


test("normalizeUrl strip slash", () => {
	const input = "https://example/path/";
	const actual = normalizeUrl(input);
	const expected = "example/path";
	expect(actual).toEqual(expected);
})


test("normalizeUrl strip http", () => {
	const input = "http://example/path";
	const actual = normalizeUrl(input);
	const expected = "example/path";
	expect(actual).toEqual(expected);
})


test("normalizeUrl capital", () => {
	const input = "https://EXamPle/path";
	const actual = normalizeUrl(input);
	const expected = "example/path";
	expect(actual).toEqual(expected);
})
