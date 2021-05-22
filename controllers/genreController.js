const genreService = require('../services/genreService')


exports.getseeds = async (req, res, next) => {
    const genres = await genreService.getAvailableGenreSeeds();
    try {
        res.send(genres);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

exports.getSimilarSongs = async (req, res, next) => {
    console.log("id: " + req.params.id);
    const songs = await genreService.getRecommendations(req.params.id, req.query.n);
    try {
        res.json(songs);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}