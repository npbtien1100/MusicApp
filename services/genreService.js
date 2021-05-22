const spotifyApi = require('../models/spotifyWebApi.model.js');

exports.getAvailableGenreSeeds = async () => {
    const temp = await spotifyApi.getAvailableGenreSeeds();
    const res = temp.body;
    return res;
}

exports.getRecommendations = async (id, n) => {
    const temp = await spotifyApi.getRecommendations({ seed_genres: id, limit: n });

    const res = { "seed_genre": id, "tracks": [] };


    temp.body.tracks.forEach((element, index) => {
        const songname = element.name;
        const image = element.album.images[1].url;
        const id = element.id;
        let artistname = "";
        for (i = 0; i < element.artists.length - 1; i++) {
            artistname += element.artists[i].name + ", ";
        }
        console.log("i day ne: " + i);
        artistname += element.artists[i].name;
        res.tracks.push({ "id": id, "song": songname, "image": image, "artists": artistname });
    });
    return res;
}