//
//  Script to post tweet to @EveryDayMaize
// by: Merritt Burch - merrittbburch@gmail.com
//


console.log('The bot is starting');

var Twit = require('twit');
var fs = require("fs")
var config = require('./config');

console.log(config)

var T = new Twit(config);


//  Tweetit function to execute below process
tweetIt();

function tweetIt() {

	// Load the image
	function processing() {
		var filename = 'maize_0.jpeg';
		var params = {
			encoding: 'base64'
		}
		var maizecontent = fs.readFileSync(filename, params);

		// Upload image to Twitter, get call back to use in Tweet
		T.post('media/upload', { media_data: maizecontent}, uploaded);

		// Function to get callback ID
		function uploaded(err, data, response) {
			// This is where I will tweet
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