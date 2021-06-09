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
    const temp2 = await spotifyApi.getTrack(id);

    const res = { "track": {}, "features": {} };

    let artistname = "";
    for (i = 0; i < temp2.body.artists.length - 1; i++) {
        artistname += temp2.body.artists[i].name + ", ";
    }
    artistname += temp2.body.artists[i].name;
    res["track"] = { "id": id, "song": temp2.body.name, "image": temp2.body.album.images[0].url, "artists": artistname };

    res.features["danceability"] = temp.body.danceability * 100;
    res.features["energy"] = temp.body.energy * 100;
    res.features["key"] = temp.body.key;
    res.features["speechiness"] = temp.body.speechiness * 100;
    res.features["acousticness"] = temp.body.acousticness * 100;
    res.features["instrumentalness"] = temp.body.instrumentalness * 100;
    res.features["liveness"] = temp.body.liveness * 100;
    res.features["valence"] = temp.body.valence * 100;
    res.features["tempo"] = temp.body.tempo;
    res.features["loudness"] = temp.body.loudness;
    res.features["duration_ms"] = temp.body.duration_ms;
    return res;
}


exports.getRecommendations = async (id, obj) => {
    try {
        const temp = await spotifyApi.getRecommendations(obj);
        const temp2 = await spotifyApi.getTrack(id);
        const res = { "seed_track": {}, "playlist_duration": "", "tracks": [] };

        let artistname = "";
        for (i = 0; i < temp2.body.artists.length - 1; i++) {
            artistname += temp2.body.artists[i].name + ", ";
        }
        artistname += temp2.body.artists[i].name;
        const seed_track = { "id": id, "song": temp2.body.name, "image": temp2.body.album.images[0].url, "artists": artistname };
        res["seed_track"] = seed_track;

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