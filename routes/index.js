var express = require('express');
var router = express.Router();

//Import the Spotify API
var Spotify = require('node-spotify-api');

//Import our Keys File
var keys = require('./keys');

//Create a Spotify Client
var spotify = new Spotify(keys.spotifyKeys);

//Store the results of a request to spotify
var results = [];

/* GET home page. */
router.get('/', function(req, res) {
	// console.log('results get: ', results);
	// res.render('index', { title: 'Spotify', results: results });
	res.send(results);
});

router.post('/', function(req, res) {
	// console.log(req);
	//Get the type of Query from the User
	var type = req.body.searchType;

	//Get the query from the user
	var query = req.body.searchContent;

	//Clear out old results
	results = [];

	//Make a request to Spotify
	spotify
		.search({ type: type, query: query })
		.then(function(spotRes) {
			//Store the artist, song, preview link, and album in the results array
			if (type === 'track') {
				spotRes.tracks.items.forEach(function(ea) {
					results.push({
						artist: ea.artists[0].name,
						song: ea.name,
						preview: ea.external_urls.spotify,
						album: ea.album.name
					});
				});
			} else if (type === 'artist') {
				spotRes.artists.items.forEach(function(ea) {
					results.push({
						artist: ea.name,
						genres: ea.genres,
						image: ea.images[0]
					});
				});
			} else if (type === 'album') {
				spotRes.albums.items.forEach(function(ea) {
					console.log('results form post ', ea);
					results.push({
						artist: ea.artists[0].name,
						name: ea.name,
						genres: ea.genres,
						releaseate: ea.release_date,
						image: ea.images[0]
					});
				});
			}
			//Render the homepage and return results to the view
			// console.log('results: ', results);
			res.render('index', { title: 'Spotify', results: results });
		})
		.catch(function(err) {
			console.log(err);
			throw err;
		});
});

module.exports = router;
