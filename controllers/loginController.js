const loginService = require('../services/loginService')



exports.createplaylist = async (req, res, next) => {
    const redirect_uri = await loginService.createplaylist();
    res.redirect(redirect_uri);
}

exports.getanalysis = async (req, res, next) => {
    return;
}