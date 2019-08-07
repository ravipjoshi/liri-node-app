require("dotenv").config();
var axios = require("axios");
var keys = require("./keys.js");
var moment = require("moment");


var Spotify = require("node-spotify-api");



var omdbkey = keys.omdb;
var bandsintownkey = keys.bandsintown;
var fs = require("fs");

var spotify = new Spotify({
  id: keys.spotify.id,
  secret: keys.spotify.secret
});

var command = process.argv[2];

if (process.argv[3] === undefined)
{
  userinput="";
   
}
else{
  userinput  = process.argv.slice(3).join(" ");
}
console.log("user input is:"+userinput);


function concert(artist)
{
   console.log ("artist is "+ artist);
   if(artist===undefined|| artist==="")
   {
      artist = "Jonas"
      console.log(artist);
   }
    axios.get(`https://rest.bandsintown.com/artists/${artist}/events?app_id=${bandsintownkey.id}`).then(
        function(response) {

         // console.log(response);
          var datetime = response.data[0].datetime;
          var dateArray = datetime.split('T');
          
          
          
          //console.log(response);
          console.log("================== Event Info ====================");
          fs.appendFileSync("log.txt", `================== Event Info ====================\n`);
          //  Name of the venue
          console.log(`Event's Venue Name: ${response.data[0].venue.name} `);
          fs.appendFileSync("log.txt",`Event's Venue Name: ${response.data[0].venue.name}\n`);
          //  Venue location
          console.log(`Event's Venue Location: ${response.data[0].venue.city}, ${response.data[0].venue.country}\n `  );
          //  Date of the Event (use moment to format this as "MM/DD/YYYY")
          fs.appendFileSync("log.txt",`Event's Venue Location: ${response.data[0].venue.city}, ${response.data[0].venue.country} \n`  );
          console.log(`Event's Date:${moment(dateArray[0]).format("MM-DD-YYYY")}`);
          fs.appendFileSync("log.txt",`Event's Date:${moment(dateArray[0]).format("MM-DD-YYYY")} \n `);
          console.log("================== Event Info ====================");
          fs.appendFileSync("log.txt","================== Event Info ====================");
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
function spotifysong(song)
{
 
  if (song === undefined || song==="")
  {
     song = "The Sign";
  } 


    spotify
  .search({ type: 'track', query: song })
  .then(function(response) {
  // console.log(response);
    for (var i = 0; i < 5; i++) {
     console.log("================== Song Info ===================="); 
     fs.appendFileSync("================== Song Info ===================="); 
     console.log(`Artist(s):   ${response.tracks.items[i].artists[0].name}`); 
     fs.appendFileSync(`Artist(s):   ${response.tracks.items[i].artists[0].name}`);
     console.log(`Song Name:  ${response.tracks.items[i].name}`);
     fs.appendFileSync(`Song Name:  ${response.tracks.items[i].name}`);
     console.log(`Album Name: ${response.tracks.items[i].album.name}`);
     fs.appendFileSync("log.txt",`Album Name: ${response.tracks.items[i].album.name}`);
    //  console.log(`Preview Link: ${response.tracks.items[i].preview_url}`);
    //  fs.appendFileSync(`Preview Link: ${response.tracks.items[i].preview_url}`);         
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
  if(movie===undefined || movie==="")
  {
    movie = "Mr. Nobody";
       console.log("================== Movie Info ====================");
       fs.appendFileSync("log.txt","================== Movie Info ====================\n");
       console.log("-----------------------");
        fs.appendFileSync("log.txt", "-----------------------\n");
        console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/\n");
        fs.appendFileSync("log.txt", "If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/" +"\n");
        console.log("It's on Netflix!\n");
        fs.appendFileSync("log.txt", "It's on Netflix!\n");
      

  }
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
      
     spotifysong(randomText[1]);

      
  });
}



// Actual Code to run the program


switch (command)
 {
    case "concert-this":
        
            concert(userinput);
      break;
    case "spotify-this-song":
      spotifysong(userinput);
      break;
    case "movie-this":
           omdb(userinput); 
      break;
    case "do-what-it-says":
      doWhatever();
      break;
    default:
        console.log("Invalid command. Please try again");  
    
  }



 