const { normalizeUrl, getUrlsFromHTML } = require("./crawler.js");
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


test("getUrlFromHTML full", () => {
	const input1 = `
<html>
	<body>
		<a href="https://example.com/path">
			path html 1
		</a>
	</body>
</html>

`;
	const input2 = "https://example.com/";
	const actual = getUrlsFromHTML(input1, input2);
	const expected = ["https://example.com/path"];
	expect(actual).toEqual(expected);
})


test("getUrlFromHTML relatev", () => {
	const input1 = `
<html>
	<body>
		<a href="/path">
			path html 1
		</a>
	</body>
</html>

`;
	const input2 = "https://example.com";
	const actual = getUrlsFromHTML(input1, input2);
	const expected = ["https://example.com/path"];
	expect(actual).toEqual(expected);
})


test("getUrlFromHTML both", () => {
	const input1 = `
<html>
	<body>
		<a href="https://example.com/path1">
			path html 1
		</a>
		<a href="/path2">

		</a>
	</body>
</html>

`;
	const input2 = "https://example.com"
	const actual = getUrlsFromHTML(input1, input2);
	const expected = ["https://example.com/path1", "https://example.com/path2"];
	expect(actual).toEqual(expected);
})

