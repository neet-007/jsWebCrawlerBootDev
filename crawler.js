const { JSDOM } = require('jsdom');

async function fetchPageHTML(baseUrl, currentUrl, pages) {
	const baseUrlObj = new URL(baseUrl);
	const currentUrlObj = new URL(currentUrl);

	if (baseUrlObj.hostname !== currentUrlObj.hostname) {
		return pages
	}

	const NcurrentUrl = normalizeUrl(currentUrl);
	if (pages[NcurrentUrl] > 0) {
		pages[NcurrentUrl] += 1;
		return pages
	}

	pages[NcurrentUrl] = 1;
	try {
		console.log(`fetching page ${currentUrl}`);

		const res = await fetch(currentUrl);

		if (res.status > 399) {
			console.log(`fetching error with status ${res.status}`);
			return pages
		}

		const contentTypes = res.headers.get("content-type");
		if (!contentTypes.includes("text/html")) {
			console.log("content is not html");
			return pages
		}

		console.log("fethecd");

		const html = await res.text()
		const urls = getUrlsFromHTML(html, baseUrl);
		for (let i = 0; i < urls.length; i++) {
			pages = await fetchPageHTML(baseUrl, urls[i], pages);
		}

		return pages

	} catch (err) {
		console.log(`error ${err.message} while fetchin page ${currentUrl}`)
	}
}

function getUrlsFromHTML(html, baseUrl) {
	const urlArr = [];
	const htmlObj = new JSDOM(html);
	const links = htmlObj.window.document.querySelectorAll("a");

	for (let i = 0; i < links.length; i++) {
		let url = links[i].href;
		if (url.startsWith("/")) {
			url = `${baseUrl}${url}`;
		}
		try {
			const urlObj = new URL(url);
			urlArr.push(urlObj.href);
		} catch (err) {
			console.log(err.message);
		}

	}

	return urlArr
}

function normalizeUrl(url) {
	const urlObj = new URL(url);
	const return_val = `${urlObj.hostname}${urlObj.pathname}`;

	if (return_val.length > 0 && return_val.slice(-1) === "/") {
		return return_val.slice(0, -1)
	}
	return return_val
}

module.exports = {
	normalizeUrl,
	getUrlsFromHTML,
	fetchPageHTML
}
