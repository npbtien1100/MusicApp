const spotifyApi = require('../models/spotifyWebApi.model.js');

exports.searchArtists = async (query) => {
    const temp = await spotifyApi.searchArtists(query, { limit: 5 });
    const res = { "artists": [] };
    temp.body.artists.items.forEach((element, index) => {
        const name = element.name;
        const image = element.images[2] ? element.images[2].url : "";
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

        const res = { "seed_artist": {}, "playlist_duration": "", "tracks": [] };

        element = temp2.body;
        res["seed_artist"] = { "id": element.id, "name": element.name, "image": element.images[0] ? element.images[0].url : "", "genres": element.genres };

        let total_ms = 0;
        temp.body.tracks.forEach((element, index) => {
            const songname = element.name;
            const image = element.album.images[1] ? element.album.images[1].url : "";
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