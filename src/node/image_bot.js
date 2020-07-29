//
//  Script to post tweet to @EveryDayMaize
// by: Merritt Burch - merrittbburch@gmail.com
// source: https://botwiki.org/resource/tutorial/random-image-tweet/
//


// How to run this
// node script_name.js

// Welcome message
console.log('The bot is starting');

// Establish some variables
var Twit = require('/Users/mbb262-admin/git_projects/maize_every_day/src/node/node_modules/twit');
var config = require('/Users/mbb262-admin/git_projects/maize_every_day/src/node/config');
var path = require('path');
var fs = require('fs');

// Show config file keys
console.log(config)

// Establish new variable for Twit package
var T = new Twit(config);

// Select one random image
function randomFromArray( images ){
  return images[Math.floor( Math.random() * images.length )];
}

// Post that image
function uploadRandomImage( images ){
  console.log( 'opening an image...' );
  const imagePath = path.join( __dirname, '/images/' + randomFromArray( images ) ),
      maizecontent = fs.readFileSync( imagePath, { encoding: 'base64' } );

  console.log( 'uploading an image...' );

  T.post( 'media/upload', { media_data: maizecontent }, function ( err, data, response ) {
    if ( err ){
      console.log( 'error:', err );
    }
    else{
      console.log( 'image uploaded, now tweeting it...' );

      T.post( 'statuses/update', {
        media_ids: new Array( data.media_id_string )
      },
        function( err, data, response) {
          if (err){
            console.log( 'error:', err );
          }
          else{
            console.log( 'posted an image!' );
          }
        }
      );
    }
  });
}


// Post new image every 10 seconds = 10000
fs.readdir( __dirname + '/images', function( err, files ) {
  if ( err ){
    console.log( 'error:', err );
  }
  else{
    let images = [];
    files.forEach( function( f ) {
      images.push( f );
    } );

    setInterval( function(){
      uploadRandomImage( images );
    }, 10000 );
  }
} );