const youtube = require("youtube-api");

youtube.authenticate({
    type: "key"
  , key: process.env.API_KEY_YOUTUBE
});

module.exports = youtube;