const { fetchPageHTML } = require("./crawler.js");

function main() {

	if (process.argv.length < 3) {
		console.log("must provide a website url");
		process.exit(1);
	}
	if (process.argv.length > 3) {
		console.log("you can only provide one url");
	}

	fetchPageHTML(process.argv[2])
}

main();
