//
//  Script to post tweet to @EveryDayMaize
// by: Merritt Burch - merrittbburch@gmail.com
//


// How to run this
// node script_name.js

// Welcome message
console.log('The bot is starting');

// Establish some variables
var Twit = require('/Users/mbb262-admin/git_projects/maize_every_day/src/node/node_modules/twit');
var config = require('/Users/mbb262-admin/git_projects/maize_every_day/src/node/config');
console.log(config)

// Establish new variable for Twit package
var T = new Twit(config);

//
//  tweet a message with a random number
//
tweetIt();
setInterval(tweetIt, 1000*60)

function tweetIt() {

	var r = Math.floor(Math.random()*100);

	var tweet = {
		status: 'I am thinking of ' + r + ' ears of corn right now #MaizeEveryDay'
	}

	// post the tweet
	T.post('statuses/update', tweet, tweeted);

	// status message to print to the terminal
	function tweeted(err, data, response) {
		if (err) {
			console.log("Something went wrong!");
		} else {
			console.log("It worked!");
		}
	}
}