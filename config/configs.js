
var base_url= 'https://www.jiosaavn.com/api.php'

var jioSaavan = {
	search: `${base_url}?_format=json&__call=autocomplete.get&_marker=0&query=`,
	songSearch: `${base_url}?_format=json&__call=search.getResults&_marker=0&q=`,
	song: `${base_url}?__call=webapi.get&type=song&includeMetaTags=0&ctx=wap6dot0&api_version=4&_marker=0&_format=json&token=`,
	album: `${base_url}?__call=webapi.get&type=album&includeMetaTags=0&ctx=wap6dot0&api_version=4&_marker=0&_format=json&token=`,
	stream: `${base_url}?__call=song.generateAuthToken&api_version=4&_format=json&ctx=wap6dot0&_marker=0&url=`,

}

module.exports = {jioSaavan}