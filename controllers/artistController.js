const artistService = require('../services/artistService')


exports.searchArtists = async (req, res, next) => {
    const artists = await artistService.searchArtists(req.query.name);
    try {
        res.send(artists);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

exports.getSimilarSongs = async (req, res, next) => {
    console.log("id: " + req.params.id);
    const songs = await artistService.getRecommendations(req.params.id, req.query.n);
    try {
        res.json(songs);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}