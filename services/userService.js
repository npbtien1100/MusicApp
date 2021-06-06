const qs = require('querystring');
const SpotifyWebApi = require('spotify-web-api-node');


exports.createplaylist = async (req, res, next) => {
    const jssdkscopes = ["user-top-read", "playlist-modify-public", "playlist-modify-private"];
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

exports.getanalysis = async (req) => {
    const spotifyApi = new SpotifyWebApi({
        clientId: process.env.CLIENT_ID,
        accessToken: req.user.accToken
    });
    try {
        const res = { "tracks": [], "artists": [], "genres": [] };
        const songs = await spotifyApi.getMyTopTracks({ offset: 0, limit: 10 });
        songs.body.items.forEach((element, index) => {
            const songname = element.name;
            const image = element.album.images[1].url;
            const id = element.id;
            let artistname = "";
            for (i = 0; i < element.artists.length - 1; i++) {
                artistname += element.artists[i].name + ", ";
            }
            artistname += element.artists[i].name;
            res.tracks.push({ "id": id, "song": songname, "image": image, "artists": artistname });
        });

        const artists = await spotifyApi.getMyTopArtists({ offset: 0, limit: 10 });
        const temp_genres = [];
        artists.body.items.forEach((element, index) => {
            const name = element.name;
            const image = element.images[1].url;
            const id = element.id;
            const followers = element.followers.total;
            res.artists.push({ "id": id, "name": name, "image": image, "followers": followers });
            temp_genres = temp_genres.concat(element.genres);
        });

        res.genres = temp_genres.filter(function (item, pos) {
            return temp_genres.indexOf(item) == pos;
        })
        return res;
    }
    catch(error){
        return error;
    }
}