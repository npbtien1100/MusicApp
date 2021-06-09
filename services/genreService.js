const spotifyApi = require('../models/spotifyWebApi.model.js');

exports.getAvailableGenreSeeds = async () => {
    const temp = await spotifyApi.getAvailableGenreSeeds();
    const res = temp.body;
    return res;
}

exports.getRecommendations = async (id, obj) => {
    try {
        const temp = await spotifyApi.getRecommendations(obj);

        const res = { "seed_genre": id, "playlist_duration": "", "tracks": [] };

        let total_ms = 0;
        temp.body.tracks.forEach((element, index) => {
            const songname = element.name;
            const image = element.album.images[1].url;
            const id = element.id;
            let artistname = "";
            for (i = 0; i < element.artists.length - 1; i++) {
                artistname += element.artists[i].name + ", ";
            }
            artistname += element.artists[i].name;
            total_ms += element.duration_ms;
            res.tracks.push({ "id": id, "song": songname, "image": image, "artists": artistname });
        });
        total_ms = total_ms / 1000;
        // Hours, minutes and seconds
        const hrs = parseInt(total_ms / 3600);
        total_ms -= hrs * 3600;
        const mins = parseInt(total_ms / 60);
        total_ms -= mins * 60;
        const secs = parseInt(total_ms);

        const ret = "" + hrs + " hrs " + mins + " mins " + secs + " secs ";
        res.playlist_duration = ret;
        return res;
    }
    catch (error) {
        return error;
    }
}