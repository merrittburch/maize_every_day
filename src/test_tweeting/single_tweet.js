//
//  Script to post tweet to @EveryDayMaize
// by: Merritt Burch - merrittbburch@gmail.com
//

// How to run this
// node script_name.js

// Welcome message
console.log('The bot is starting');

var Twit = require('/Users/mbb262-admin/git_projects/maize_every_day/src/node/node_modules/twit');
var config = require('/Users/mbb262-admin/git_projects/maize_every_day/src/node/config');
console.log(config)

// Establish new variable for Twit package
var T = new Twit(config);

//
//  tweet a message
//
var tweet = {
	status: 'Maize was domesticated 8,000-10,000 years ago #MaizeEveryDay'
}

T.post('statuses/update', tweet, tweeted);

function tweeted(err, data, response) {
	if (err) {
		console.log("Something went wrong!");
	} else {
		console.log("It worked!");
	}
}