require("dotenv").config();
var axios = require("axios");
var keys = require("./keys.js");
var moment = require("moment");
moment().format('L');

var Spotify = require("node-spotify-api");



var omdbkey = keys.omdb;
var bandsintownkey = keys.bandsintown;
var fs = require("fs");

var spotify = new Spotify({
  id: keys.spotify.id,
  secret: keys.spotify.secret
});





function concert(artist)
{
    axios.get(`https://rest.bandsintown.com/artists/${artist}/events?app_id=${bandsintownkey.id}`).then(
        function(response) {

          var datetime = response.data[0].datetime;
          var dateArr = datetime.split('');
          var date = moment(dateArr);
          console.log(date);
          
          //console.log(response);
          
          fs.appendFileSync("log.txt", `================== Song ====================`);
          //  Name of the venue
          console.log(`Event's Venue Name: ${response.data[0].venue.name} `);
          fs.appendFileSync("log.txt",`Event's Venue Name: ${response.data[0].venue.name}`);
          //  Venue location
          console.log(`Event's Venue Location: ${response.data[0].venue.city}, ${response.data[0].venue.country} `  );
          //  Date of the Event (use moment to format this as "MM/DD/YYYY")
          fs.appendFileSync("log.txt",`Event's Venue Location: ${response.data[0].venue.city}, ${response.data[0].venue.country} `  );
          console.log(`Event's Date:${ date}  `);
          fs.appendFileSync("log.txt",`Event's Date:${ date}  `);
        })
        .catch(function(error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            
            console.log("---------------Data---------------");
            fs.appendFileSync("log.txt","---------------Data---------------");
            console.log(error.response.data);
            fs.appendFileSync("log.txt",error.response.data);
            console.log("---------------Status---------------");
            fs.appendFileSync("log.txt","---------------Status---------------")
            console.log(error.response.status);
            fs.appendFileSync("log.txt",error.response.status);
            console.log("---------------Status---------------");
            fs.appendFileSync("log.txt","---------------Status---------------");
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
function spotify(song)
{
  spotify
  .search({ type: 'track', query: song })
  .then(function(response) {
    console.log(response);
    for (var i = 0; i < 5; i++) {
     console.log("================== Song Info ===================="); 
     fs.appendFileSync("================== Song Info ===================="); 
     console.log(`Artist(s):   ${response.tracks.items[i].artists[0].name}`); 
     fs.appendFileSync(`Artist(s):   ${response.tracks.items[i].artists[0].name}`);
     console.log(`Song Name:  ${response.tracks.items[i].name}`);
     fs.appendFileSync(`Song Name:  ${response.tracks.items[i].name}`);
     console.log(`Album Name: ${response.tracks.items[i].album.name}`);
     fs.appendFileSync(`Album Name: ${response.tracks.items[i].album.name}`);
     console.log(`Preview Link: ${response.tracks.items[i].preview_url}`);
     fs.appendFileSync(`Preview Link: ${response.tracks.items[i].preview_url}`);         
      //console.log(spotifyResults);
      console.log("================== Song Info====================");
      fs.appendFileSync("================== Song Info ===================="); 
    }
  })
  .catch(function(err) {
    console.log(err);

  }); 
  

}
function omdb(movie)
{
    axios.get(`http://www.omdbapi.com/?t=${movie}&y=&plot=short&apikey=${omdbkey.id}`).then(
  function(response) {
    
   console.log("================== Movie Info ====================");
   fs.appendFileSync("log.txt","================== Movie Info ====================");
   // Title of the movie.
   console.log("The movie's rating is: " + response.data.Title);
   fs.appendFileSync("log.txt","The movie's rating is: " + response.data.Title);
   // Year the movie came out.
   console.log("The movie's rating is: " + response.data.Year);
   fs.appendFileSync("log.txt","The movie's rating is: " + response.data.Year);
   // IMDB Rating of the movie.
   console.log("The movie's rating is: " + response.data.imdbRating);
   fs.appendFileSync("log.txt","The movie's rating is: " + response.data.imdbRating);
   // Rotten Tomatoes Rating of the movie.
   console.log("The movie's rating is: " + response.data.Ratings[1].Value);
   fs.appendFileSync("log.txt","The movie's rating is: " + response.data.Ratings[1].Value);
   // Country where the movie was produced.
   console.log("The movie's country is: " + response.data.Country);
   fs.appendFileSync("log.txt","The movie's country is: " + response.data.Country);
   // Language of the movie.
   console.log("The movie's language is: " + response.data.Language);
   fs.appendFileSync("log.txt","The movie's language is: " + response.data.Language);
   // Plot of the movie.
   console.log("The movie's plot is: " + response.data.Plot);
   fs.appendFileSync("log.txt","The movie's plot is: " + response.data.Plot);
   // Actors in the movie
   console.log("The movie's Actors are: " + response.data.Actors);
   fs.appendFileSync("log.txt","The movie's Actors are: " + response.data.Actors);
   console.log("================== Movie Info ====================");
   fs.appendFileSync("log.txt","================== Movie Info ====================");
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

 //Do what it says reads text from random.txt file, command is ran
 var doWhatever = function() {
  fs.readFile("random.txt", "utf8", function (err, data) {
      if (err) throw err;
          var randomText = data.split(",");
      
      if (randomText.length == 2) {
          ask(randomText[0], randomText[1]);
      }
      else if (randomText.length == 1) {
          ask(randomText[0]);
      }
  });
}



// Actual Code to run the program


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
      doWhatever();
      break;
    default:
        console.log("Invalid command. Please try again");  
    
  }



 