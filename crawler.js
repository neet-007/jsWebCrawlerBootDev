function normalizeUrl(url) {
	const urlObj = new URL(url);
	const return_val = `${urlObj.hostname}${urlObj.pathname}`;

	if (return_val.endsWith("/")) {
		return return_val.slice(0, -1)
	}
	return return_val
}

module.exports = {
	normalizeUrl
}
