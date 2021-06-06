const userService = require('../services/userService')



exports.createplaylist = async (req, res, next) => {
    const redirect_uri = await userService.createplaylist();
    res.redirect(redirect_uri);
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
