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
    const res = {
        "danceability": temp.body.danceability * 100,
        "energy": temp.body.energy * 100, "key": temp.body.key,
        "speechiness": temp.body.speechiness * 100,
        "acousticness": temp.body.acousticness * 100,
        "instrumentalness": temp.body.instrumentalness * 100,
        "liveness": temp.body.liveness * 100, "valence": temp.body.valence * 100,
        "tempo": temp.body.tempo,
        "loudness": temp.body.loudness,
        "duration_ms": temp.body.duration_ms
    }
    return res;
}


exports.getRecommendations = async (id, obj) => {
    try {
        const temp = await spotifyApi.getRecommendations({ seed_tracks: id, target_instrumentalness: undefined });
        const temp2 = await spotifyApi.getTrack(id);
        const res = { "seed_track": {}, "tracks": [] };

        let artistname = "";
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
            artistname += element.artists[i].name;
            res.tracks.push({ "id": id, "song": songname, "image": image, "artists": artistname });
        });
        return res;
    }
    catch (error) {
        return error;
    }
}

exports.getnewreleases = async (market, n) => {
    const temp = await spotifyApi.getNewReleases({ country: market, limit: n });
    const res = { "country": market, "tracks": [] };

    temp.body.albums.items.forEach((element, index) => {
        const songname = element.name;
        const image = element.images[1].url;
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