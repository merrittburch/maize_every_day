//
//  Script to post tweet to @EveryDayMaize
// by: Merritt Burch - merrittbburch@gmail.com
//


console.log('The image bot is starting');

// Establish some variables
var Twit = require('/Users/mbb262-admin/git_projects/maize_every_day/src/node/node_modules/twit');
var config = require('/Users/mbb262-admin/git_projects/maize_every_day/src/node/config');

// Establish new variable for Twit package
var T = new Twit(config);
var exec = require('child_process').exec;
var fs = require('fs');

// Show access keys in the config file
console.log(config)

console.log("Before calling function")

//  call the function to send tweet
tweetIt();
setInterval(tweetIt, 1000*60)


console.log("Where is the error")

function tweetIt() {
  exec(processing);
  console.log("execute processing function")

  // Load the image
  function processing() {
    var filename = './maize.png';
    var params = {
      encoding: 'base64'
    }
    var maizecontent = fs.readFileSync(filename, params);
    console.log("finsihed reading in file")

    // Upload image to Twitter, get call back to use in Tweet
    T.post('media/upload', { media_data: maizecontent}, uploaded);

    // Function to get callback ID
    function uploaded(err, data, response) {
      var id = data.media_id_string;
      var tweet = {
        status: '#MaizeEveryDay',
        media_ids: [id]
      }
      T.post('statuses/update', tweet, tweeted);
    }

    function tweeted(err, data, response) {
      if (err) {
        console.log("Something went wrong!");
      } else {
        console.log("It worked!");
      }
    }
  }
}
