const userService = require('../services/userService')



exports.createplaylist = async (req, res, next) => {
    try {
        const kq = await userService.createPlaylist(req);
        res.json(kq);
    }
    catch (error) {
        res.status(400).json("Error: " + error);
    }
}

exports.generateBaOnAnalysis = async (req, res) => {
    try {
        const songs = await userService.generateBasedOnAnalysis(req);
        res.json(songs);
    }
    catch (error) {
        res.status(400).json("Error: " + error);
    }

}

exports.getanalysis = async (req, res) => {
    try {
        const artists = await userService.getanalysis(req);
        res.json(artists);
    }
    catch (error) {
        res.status(400).json("Error: " + error);
    }
}
