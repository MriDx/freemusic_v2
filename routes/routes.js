var express = require('express')
var router = express.Router()
var {search, song, jsStream, directStream, directStream, searchSong} = require('../functions/functions')


router.get('/', function (req, res) {
	res.json({ message: 'Welcome !' })
})

router.get('/search/:query', search)
router.get('/search/song/:query/:page', searchSong)

router.get('/song/:from/:song', song)

router.get('/stream/:url', jsStream)
router.get('/stream/:from/direct/:song', directStream)
//router.get('/play/:url', directStream)


module.exports = router