const qs = require("querystring");
const SpotifyWebApi = require("spotify-web-api-node");
const spotifyApi = require("../models/spotifyWebApi.model.js");

exports.getanalysis = async (req) => {
  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    accessToken: req.user.accToken,
  });
  try {
    const res = { tracks: [], artists: [], genres: [] };
    const songs = await spotifyApi.getMyTopTracks({ offset: 0, limit: 10 });
    songs.body.items.forEach((element, index) => {
      const songname = element.name;
      const image = element.album.images[1] ? element.album.images[1].url : "";
      const id = element.id;
      let artistname = "";
      for (i = 0; i < element.artists.length - 1; i++) {
        artistname += element.artists[i].name + ", ";
      }
      artistname += element.artists[i].name;
      res.tracks.push({
        id: id,
        song: songname,
        image: image,
        artists: artistname,
      });
    });

    const artists = await spotifyApi.getMyTopArtists({ offset: 0, limit: 10 });
    let temp_genres = [];
    artists.body.items.forEach((element, index) => {
      const name = element.name;
      const image = element.images[1] ? element.images[1].url : "";
      const id = element.id;
      const followers = element.followers.total;
      res.artists.push({
        id: id,
        name: name,
        image: image,
        followers: followers,
      });
      temp_genres = temp_genres.concat(element.genres);
    });

    res.genres = temp_genres.filter(function (item, pos) {
      return temp_genres.indexOf(item) == pos;
    });
    return res;
  } catch (error) {
    return error;
  }
};

exports.generateBasedOnAnalysis = async (req) => {
  const obj = {
    limit: req.body.n,
    seed_tracks: req.body.tracks,
    seed_artists: req.body.artists,
    seed_genres: req.body.genres,
  };
  try {
    const temp = await spotifyApi.getRecommendations(obj);
    const res = { seed_user: {}, playlist_duration: "", tracks: [] };

    const user = await spotifyApi.getUser(req.user.id);
    res.seed_user = {
      name: user.body.display_name,
      image: user.body.images[0] ? user.body.images[0].url : "",
    };

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
      res.tracks.push({
        id: id,
        song: songname,
        image: image,
        artists: artistname,
      });
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
  } catch (error) {
    return error;
  }
};

exports.createPlaylist = async (req) => {
  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    accessToken: req.user.accToken,
  });
  try {
    const temp = await spotifyApi.createPlaylist(req.body.playlist_name, {
      public: req.body.public,
    });
    const tracks = [];
    req.body.songids.forEach((element, index) => {
      tracks.push("spotify:track:" + element);
    });
    const kq = await spotifyApi.addTracksToPlaylist(temp.body.id, tracks);
    return kq.body;
  } catch (error) {
    return error;
  }
};
