const SpotifyWebApi = require('spotify-web-api-node');
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET
});

let timeout;
// Retrieve an access token.
spotifyApi.clientCredentialsGrant().then(
  function (data) {
    console.log('the type of expire in: ', typeof (data.body['expires_in']));
    console.log('The access token expires in ' + data.body['expires_in']);
    console.log('The access token is ' + data.body['access_token']);

    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body['access_token']);
    // Save the amount of seconds until the access token expired
    timeout = data.body['expires_in'];
  },
  function (err) {
    console.log('Something went wrong when retrieving an access token', err);
  }
);
// Continually print out the time left until the token expires..
let numberOfTimesUpdated = 0;
setInterval(function () {

  // OK, we need to refresh the token. Stop printing and refresh.
  if (++numberOfTimesUpdated > timeout - 1) {
    //clearInterval(this);
    numberOfTimesUpdated = 0;
    // Refresh token and print the new time to expiration.
    spotifyApi.clientCredentialsGrant().then(
      function (data) {
        // Save the access token so that it's used in future calls
        spotifyApi.setAccessToken(data.body['access_token']);
        console.log("Refreshed token. The new token is: ", data.body['access_token']);
      },
      function (err) {
        console.log('Something went wrong when retrieving an access token', err);
      }
    );
  }
}, 1000);
module.exports = spotifyApi;

