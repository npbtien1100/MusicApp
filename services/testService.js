const spotifyApi=require('../models/spotifyWebApi.model.js');
exports.test = async () => {
    const temp= await spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE');
    const entriesArray = Object.entries(temp.body);
    const newEntriesArray = entriesArray.filter(([key, value]) => key !== 'items');
    const res = Object.fromEntries(newEntriesArray);
    return res;
}
exports.test2 = async()=>{
    const temp = await spotifyApi.getRecommendations({seed_tracks: '3Ofmpyhv5UAQ70mENzB277'})
    return temp;
}