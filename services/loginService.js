const spotifyApi = require("../models/spotifyWebApi.model")
const qs = require('querystring')

exports.createplaylist = async (req, res, next) => {
    const jssdkscopes = ["user-top-read","playlist-modify-public","playlist-modify-private"];
    const redirectUriParameters = {
        client_id: process.env.CLIENT_ID,   
        response_type: 'code',
        scope: jssdkscopes.join(' '),
        redirect_uri: encodeURI('http://localhost:5000/login/callback'),
        show_dialog: true,
    }
    const redirectUri = `https://accounts.spotify.com/authorize?${qs.stringify(redirectUriParameters)}`;
    return redirectUri;
}

exports.getanalysisasync = async (req, res, next) => {

}