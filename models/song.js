const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SongSchema = new Schema(
	{
		_id: String,
		artist: String,
		song: String,
		preview: String,
		album: String
	},
	{
		collection: 'Songs'
	}
);

var Song = mongoose.model('Song', SongSchema);

module.exports = { Song };
