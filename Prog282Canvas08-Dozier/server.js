/**
 * @author Charlie Calvert
 * 
 * Refernces:
 * 	http://dailyjs.com/2012/01/26/effective-node-modules/
 */
 
/*jshint browser: true, devel: true, strict: true */
/*global require: true, process: true */

var express = require('express');
var app = express();
var fs = require('fs');
var couch = require('./Library/CouchCode.js');
var nano = require('nano')('http://127.0.0.1:5984');
var dbName = 'OdisciousGame';


var templater = require('./Library/Templater');
/*var templater = require('/Library/Templater');*/

console.log(templater);

var port = process.env.PORT || 30025;


app.get('/', function(request, response) { 'use strict';
	console.log("in default route");
	var htmlTemplate = templater.template;
	var html = htmlTemplate.addTable(
		__dirname + '/Public/index.html',
		__dirname + '/Templates/OrcTable02.html'
	);
	response.writeHead(200, {"Content-Type": "text/html"});
	response.end(html);
 app.use("/Templates", express.static('./Templates'));
 app.use("/", express.static('./Public'));
 //This following line of code looks to be a redundant satement...
 app.use("/Public", express.static('./Public'));
 
 app.use("/Library", express.static('./Library'))
});

//Is the route - means when ajax call is made to server.  This is what to follow.
app.get('/read', function(request, response){
	console.log('Read called: ');
	var obj;
	
	function readData(err, data) {
		if (err) throw err;
		obj = JSON.parse(data);
		response.send(obj);
	}

	// Asynch call 
	fs.readFile(request.query.fileName, 'utf8', readData);
});
app.get('/writeHero', function(request, response) {
        console.log('Write called: ' + request.query);
        var heroData = request.query;
        var heroString = JSON.stringify(heroData, null, 4);
        console.log('HeroString: ' + heroString);
        //fs.write(name of the file, what to write, 'utf8', a function for errors via server)
        fs.writeFile(Hero.json, heroString, 'utf8', function(err, data){
                if (err) throw err;
                console.log('It\'s saved!');
        });
        response.send('{"result":"Hero data saved successfully!"}');
});

app.get('/writeOrc', function(request, response) {
        console.log('Write called: ' + request.query);
        var orcData = request.query;
        var orcString = JSON.stringify(orcData, null, 4);
        console.log('OrcString: ' + orcString);
        //fs.write(name of the file, what to write, 'utf8', a function for errors via server)
        fs.writeFile(Orc.json, orcString, 'utf8', function(err, data){
                if (err) throw err;
                console.log('It\'s saved!');
        });
        response.send('{"result":"Orc data saved successfully!"}');
});


function run() {
	var docName = "index.html";
	var fileName = "./Public/index.html";

	fs.exists(fileName, function(exists) {
		if (exists) {
			var data = fs.readFileSync(fileName);
			
			couch.couchCode.createDatabase(dbName, function(error) {
				if (!error) {
					couch.couchCode.couchAttach(null, docName, data, dbName);
				} else {
				  couch.couchCode.reportError(error);			    
				}
			});
		} else {
			console.log('could not find: ' + fileName);
		}
	})
};

function explain() {
	console.log('\n\nPlease pass in the docName you want to use in');
	console.log('couchDb and the name of the document you want');
	console.log('send to couchDb\n');
	console.log('Example: ');
	console.log('  node CouchAttach.js index index.html');
};

if (process.argv.length === 4) {
	run();
} else {
	explain();
}

app.listen(port);
console.log('Listening on port :' + port);
console.log('For first and second screen shots');