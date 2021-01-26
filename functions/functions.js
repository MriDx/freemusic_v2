
var request = require('request')
var {jioSaavanApi, jioSaavan} = require('../config/configs')


function search(req, res) {

	//grab the param
	var query = req.params.query

	request.get(`${jioSaavan.search}${query}`, null, (e, r, b) => {
		if (e) {
			console.error(e)
			return res.json({status: 'failed'})
		}
		var data = JSON.parse(b)
		return res.json({status: 'success', data: [{from: 'jiosaavan', data}]})
	})

}

function searchSong(req, res) {
	var { query, page } = req.params
	request.get(`${jioSaavan.songSearch}${query}&p=${page}`, null, (e, r, b) => {
		if (e) {
			console.error(e)
			return res.json({status: 'failed'})
		}
		var data = JSON.parse(b)
		return res.json({status: 'success', data: data['results']})
	})
}

function song(req, res) {
	var { from, song } = req.params
	if (from == 'jiosaavan') {
		//call from jio saavan
		request.get(`${jioSaavan.song}${song}`, null, (e, r, b) => {
			if (e) {
				console.error(e)
				return res.json({status: 'failed'})
			}
			var song = JSON.parse(b)
			return res.json({status: 'success', data: song})
		})
	}
}

function jsStream(req, res) {
	var url = encodeURIComponent(req.params.url)
	request.get(`${jioSaavan.stream}${url}&bitrate=320`, null, (e, r, b) => {
		if (e) {
			return res.json({status: 'failed', error: e})
		}
		var data = JSON.parse(b)
		return res.json({status: 'success', stream: data.auth_url})
	})
}

/* function directStream(req, res) {
	var url = encodeURIComponent(req.params.url)
	request.get(`${jioSaavan.stream}${url}&bitrate=320`, null, (e, r, b) => {
		if (e) {
			return res.json({status: 'failed', error: e})
		}
		var data = JSON.parse(b)
		return res.write(data.auth_url)
	})
} */

function directStream(req, res) {
	var { from, song } = req.params
	if (from == 'js') {
		//call from jio saavan
		request.get(`${jioSaavan.song}${song}`, null, (e, r, b) => {
			if (e) {
				console.error(e)
				return res.json({status: 'failed'})
			}
			var d = JSON.parse(b)
			var url = encodeURIComponent(d['songs'][0]['more_info']['encrypted_media_url'])
			request.get(`${jioSaavan.stream}${url}&bitrate=320`, null, (e, r, b) => {
			if (e) {
				return res.json({status: 'failed', error: e})
			}
			var data = JSON.parse(b)
			return res.json({status: 'success', stream: data.auth_url})
			})
		})
	}
}


module.exports = {search, song, jsStream, directStream, searchSong}