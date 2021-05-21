const trackService = require('../services/trackService')

exports.searchTracks = async (req, res, next) => {
    console.log("query = " + req.query.name);
    const tracks = await trackService.searchTracks(req.query.name);
    try {
        res.send(tracks);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }

}

exports.getAudioFeatures = async (req, res, next) => {
    const data = await trackService.getAudioFeaturesForTrack(req.query.id);
    try {
        res.send(data);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

exports.getGenres = async (req, res, next) => {
    const genres = await trackService.getGenres();
    try {
        res.json(genres);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

exports.getSimilarSongs = async (req, res, next) => {
    console.log("id: " + req.params.id);
    const songs = await trackService.getRecommendations(req.params.id, req.query.n);
    try {
        res.json(songs);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}