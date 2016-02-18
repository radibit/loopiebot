'use strict';

var express    = require( 'express' );
var SlackBot   = require( 'slackbots' );
var bodyParser = require( 'body-parser' );
var request    = require( 'request' );

var loopiebot  = require( './loopiebot' );

var app  = express();
var port = process.env.PORT || 3000;

var options = {
  url     : process.env.LOOPIE_URI,
  headers : {
    'X-Loopline-Client' : process.env.LOOPIE_X_CLIENT,
    'Authorization'     : process.env.LOOPIE_AUTH
  }
};

// body parser middleware
app.use( bodyParser.urlencoded( {
  extended : true } )
);

// test route
app.get( '/', function ( req, res ) {
  request( options, function( error, response, body ) {
    if ( !error && response.statusCode == 200 ) {
      var info = JSON.parse( body );
      console.log( info );
      console.log( body );

      res.status( 200 ).send( body );
    }
  } );
} );

app.post( '/loopie', loopiebot );

// error handler
app.use( function ( err, req, res, next ) {
  console.error( err.stack );

  res.status( 400 ).send( err.message );
} );

app.listen( port, function () {
  console.log( 'Express listening on port ' + port );
} );
