const { fetchPageHTML } = require("./crawler.js");
const { printResults } = require("./report.js");

async function main() {

	if (process.argv.length < 3) {
		console.log("must provide a website url");
		process.exit(1);
	}
	if (process.argv.length > 3) {
		console.log("you can only provide one url");
	}

	const pages = await fetchPageHTML(process.argv[2], process.argv[2], {});
	printResults(pages)

}

main();
