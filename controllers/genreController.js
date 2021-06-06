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
    req.query.acousticness ? (req.query.acousticness = Number(req.query.acousticness) / 100) : "";
    req.query.danceability ? (req.query.danceability = Number(req.query.danceability) / 100) : "";
    req.query.instrumentalness ? (req.query.instrumentalness = Number(req.query.instrumentalness) / 100) : "";
    req.query.energy ? (req.query.energy = Number(req.query.energy) / 100) : "";
    req.query.valence ? (req.query.valence = Number(req.query.valence) / 100) : "";
    req.query.speechiness ? (req.query.speechiness = Number(req.query.speechiness) / 100) : "";
    const obj = {
        seed_genres: req.params.id, limit: Number(req.query.n),
        target_acousticness: req.query.acousticness,
        target_danceability: req.query.danceability,
        target_instrumentalness: req.query.instrumentalness,
        target_energy: req.query.energy,
        target_valence: req.query.valence,
        target_speechiness: req.query.speechiness,
    };
    try {
        const songs = await genreService.getRecommendations(req.params.id, obj);
        res.json(songs);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}