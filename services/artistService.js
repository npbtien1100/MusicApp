const spotifyApi = require('../models/spotifyWebApi.model.js');

exports.searchArtists = async (query) => {
    const temp = await spotifyApi.searchArtists(query, { limit: 5 });
    const res = { "artists": [] };
    temp.body.artists.items.forEach((element, index) => {
        const name = element.name;
        const image = element.images[2].url;
        const id = element.id;
        const followers = element.followers.total;
        res.artists.push({ "id": id, "name": name, "image": image, "followers": followers });
    });
    return res;
}

exports.getRecommendations = async (id, obj) => {
    try {
        const temp = await spotifyApi.getRecommendations(obj);
        const temp2 = await spotifyApi.getArtist(id);

        const res = { "seed_artist": {}, "tracks": [] };

        element = temp2.body;
        res["seed_artist"] = { "id": element.id, "name": element.name, "image": element.images[0].url, "genres": element.genres };

        temp.body.tracks.forEach((element, index) => {
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
        return res;
    }
    catch (error) {
        return error;
    }
}