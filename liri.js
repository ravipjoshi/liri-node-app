require("dotenv").config();
var axios = require("axios");
var keys = require("./keys.js");
var moment = require("moment");

var spotifykey = keys.spotify;
var omdbkey = keys.omdb;
var bandsintownkey = keys.bandsintown;



function concert(artist)
{
    axios.get(`https://rest.bandsintown.com/artists/${artist}/events?app_id=${bandsintownkey.id}`).then(
        function(response) {
         
          //  Name of the venue
          console.log(`Event's Venue Name: ${response.data[0].venue.name}`);
          //  Venue location
          console.log(`Event's Venue Location: ${response.data[0].venue.city}, ${response.data[0].venue.country} `  );
          //  Date of the Event (use moment to format this as "MM/DD/YYYY")

          console.log(`Event's Date:${response.data[0].datetime}  `);
        })
        .catch(function(error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log("---------------Data---------------");
            console.log(error.response.data);
            console.log("---------------Status---------------");
            console.log(error.response.status);
            console.log("---------------Status---------------");
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an object that comes back with details pertaining to the error that occurred.
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
      

}
function spotify(query)
{
    axios.get(`http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy`).then(
  function(response) {
    console.log("The movie's rating is: " + response.data.imdbRating);
  })
  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("---------------Data---------------");
      console.log(error.response.data);
      console.log("---------------Status---------------");
      console.log(error.response.status);
      console.log("---------------Status---------------");
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });


}
function omdb(movie)
{
    axios.get(`http://www.omdbapi.com/?t=${movie}&y=&plot=short&apikey=${omdbkey}`).then(
  function(response) {
    console.log("The movie's rating is: " + response.data.imdbRating);
  })
  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("---------------Data---------------");
      console.log(error.response.data);
      console.log("---------------Status---------------");
      console.log(error.response.status);
      console.log("---------------Status---------------");
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });

}





switch (process.argv[2])
 {
    case "concert-this":
        
            concert(process.argv[3]);
      break;
    case "spotif-this-song":
            spotify(process.argv[3]);
      break;
    case "movie-this":
           omdb(process.argv[3]); 
      break;
    case "do-what-it-says":

      break;
    
  }