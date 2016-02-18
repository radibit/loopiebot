'use strict';

var express    = require( 'express' );
var SlackBot   = require( 'slackbots' );
var bodyParser = require( 'body-parser' );

var loopiebot  = require( './loopiebot' );

var app  = express();
var port = process.env.PORT || 3000;

// body parser middleware
app.use( bodyParser.urlencoded( {
  extended : true } )
);

// test route
app.get( '/', function (req, res) {
  res.status( 200 ).send( 'Hello loopies!' )
} );

app.post( '/loopie', loopiebot );

// error handler
app.use(function ( err, req, res, next ) {
  console.error( err.stack );

  res.status( 400 ).send( err.message );
} );

app.listen( port, function () {
  console.log( 'Express listening on port ' + port );
} );
