const { JSDOM } = require('jsdom');

async function fetchPageHTML(url) {
	try {
		const res = await fetch(url);

		if (res.status > 399) {
			console.log(`fetching error with status ${res.status}`);
			return
		}

		const contentTypes = res.headers.get("content-type");
		if (!contentTypes.includes("text/html")) {
			console.log("content is not html");
			return
		}

		console.log(await res.text())
	} catch (err) {
		console.log(`error ${err.message} while fetchin page ${url}`)
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

	if (return_val.endsWith("/")) {
		return return_val.slice(0, -1)
	}
	return return_val
}

module.exports = {
	normalizeUrl,
	getUrlsFromHTML,
	fetchPageHTML
}
