const spotifyApi = require('../models/spotifyWebApi.model.js');

exports.searchTracks = async (query) => {
    const temp = await spotifyApi.searchTracks('track: ' + query, { limit: 5 });
    const res = { "tracks": [] };
    temp.body.tracks.items.forEach((element, index) => {
        const songname = element.name;
        const image = element.album.images[2].url;
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

exports.getAudioFeaturesForTrack = async (id) => {
    const temp = await spotifyApi.getAudioFeaturesForTrack(id);
    return temp;
}

exports.getGenres = async () => {
    const temp = await spotifyApi.getAvailableGenreSeeds();
    const res = temp.body;
    return res;
}

exports.getRecommendations = async (id, n) => {
    const temp = await spotifyApi.getRecommendations({ seed_tracks: id, limit: n });
    const temp2 = await spotifyApi.getTrack(id);
    const res = { "seed_track": {}, "tracks": [] };

    let artistname="";
    for (i = 0; i < temp2.body.artists.length - 1; i++) {
        artistname += temp2.body.artists[i].name + ", ";
    }
    artistname += temp2.body.artists[i].name;
    const seed_track = { "id": id, "song": temp2.body.name, "image": temp2.body.album.images[0].url, "artists": artistname };
    res["seed_track"] = seed_track;

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