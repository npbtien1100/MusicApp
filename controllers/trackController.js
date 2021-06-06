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
    try {
        const data = await trackService.getAudioFeaturesForTrack(req.params.id);
        res.send(data);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}


exports.getSimilarSongs = async (req, res, next) => {
    console.log("id: " + req.params.id);
    req.query.acousticness == 'null' ? req.query.acousticness = undefined : req.query.acousticness = Number(req.query.acousticness)/100;
    req.query.danceability == 'null' ? req.query.danceability = undefined : req.query.danceability = Number(req.query.danceability)/100;
    req.query.instrumentalness == 'null' ? req.query.instrumentalness = undefined : req.query.instrumentalness = Number(req.query.instrumentalness)/100;
    req.query.energy == 'null' ? req.query.energy = undefined : req.query.energy = Number(req.query.energy)/100;
    req.query.valence == 'null' ? req.query.valence = undefined : req.query.valence = Number(req.query.valence)/100;
    req.query.speechiness == 'null' ? req.query.speechiness = undefined : req.query.speechiness = Number(req.query.speechiness)/100;
    const obj = {
        seed_tracks: req.params.id, limit: Number(req.query.n),
        target_acousticness: req.query.acousticness,
        target_danceability: req.query.danceability,
        target_instrumentalness: req.query.instrumentalness,
        target_energy: req.query.energy,
        target_valence: req.query.valence,
        target_speechiness: req.query.speechiness,
    };
    try {
        console.log('object day ne: ', obj);
        const songs = await trackService.getRecommendations(req.params.id, obj);
        res.json(songs);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

exports.getnewreleases = async (req, res, next) => {
    const songs = await trackService.getnewreleases(req.query.market, req.query.n);
    try {
        res.json(songs);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}