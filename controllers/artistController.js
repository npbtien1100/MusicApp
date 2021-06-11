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
    req.query.min_acousticness ? (req.query.min_acousticness = Number(req.query.min_acousticness) / 100) : "";
    req.query.max_acousticness ? (req.query.max_acousticness = Number(req.query.max_acousticness) / 100) : "";
    req.query.min_danceability ? (req.query.min_danceability = Number(req.query.min_danceability) / 100) : "";
    req.query.max_danceability ? (req.query.max_danceability = Number(req.query.max_danceability) / 100) : "";
    req.query.min_instrumentalness ? (req.query.min_instrumentalness = Number(req.query.min_instrumentalness) / 100) : "";
    req.query.max_instrumentalness ? (req.query.max_instrumentalness = Number(req.query.max_instrumentalness) / 100) : "";
    req.query.min_energy ? (req.query.min_energy = Number(req.query.min_energy) / 100) : "";
    req.query.max_energy ? (req.query.max_energy = Number(req.query.max_energy) / 100) : "";
    req.query.min_valence ? (req.query.min_valence = Number(req.query.min_valence) / 100) : "";
    req.query.max_valence ? (req.query.max_valence = Number(req.query.max_valence) / 100) : "";
    req.query.min_speechiness ? (req.query.min_speechiness = Number(req.query.min_speechiness) / 100) : "";
    req.query.max_speechiness ? (req.query.max_speechiness = Number(req.query.max_speechiness) / 100) : "";
    const obj = {
        seed_artists: req.params.id, limit: Number(req.query.n),
        min_acousticness: req.query.min_acousticness,
        max_acousticness: req.query.max_acousticness,
        min_danceability: req.query.min_danceability,
        max_danceability: req.query.max_danceability,
        min_instrumentalness: req.query.min_instrumentalness,
        max_instrumentalness: req.query.max_instrumentalness,
        min_energy: req.query.min_energy,
        max_energy: req.query.max_energy,
        min_valence: req.query.min_valence,
        max_valence: req.query.max_valence,
        min_speechiness: req.query.min_speechiness,
        max_speechiness: req.query.max_speechiness,
    };
    try {
        const songs = await artistService.getRecommendations(req.params.id, obj);
        res.json(songs);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}