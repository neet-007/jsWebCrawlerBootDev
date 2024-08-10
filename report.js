function printResults(pages) {
	console.log("======");
	console.log("REPORT");
	console.log("======");

	const sortedPages = sortPages(pages);
	for (const pagePair of sortedPages) {
		console.log(`Found ${pagePair[1]} links to page:${pagePair[0]}`);
	}

	console.log("======")
	console.log("END REPORT")
	console.log("======")
}

function sortPages(pages) {
	const pagesArr = Object.entries(pages);
	pagesArr.sort((a, b) => {
		return b[1] - a[1]
	});
	return pagesArr;
}

module.exports = {
	sortPages,
	printResults
}
