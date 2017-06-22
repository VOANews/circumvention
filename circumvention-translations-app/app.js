var express = require('express');
//var path = require('path');
//var favicon = require('serve-favicon');
//var logger = require('morgan');
//var cookieParser = require('cookie-parser');
//var bodyParser = require('body-parser');

//var routes = require('./routes/index');

var app = express();

var fs = require('fs');
var jf = require('jsonfile');
var Tabletop = require('tabletop');










//A simple function for reading files.
function readJSONFile( path ){
	var binaryData = fs.readFileSync( path );
	return JSON.parse( binaryData.toString() );
}


//var sections = ['overview', 'dictionary', 'toc', 'dns', 'freegate', 'pgp', 'psiphon', 'tor', 'ultrasurf', 'vpn']
var sections = ['overview', 'dictionary', 'dns', 'freegate', 'pgp', 'psiphon', 'tor', 'ultrasurf', 'vpn']







for (var i = 0; i<sections.length; i++){
	//Use namespaced global variable to keep data that will update. 
	//EXAMPLE: global.freegate = {};
	global[sections[i]] = {};

	//Load data from saved JSON files into global variables.
	//EXAMPLE: global.overview.sitewide = readJSONFile('../data/sitewide.json');
	var filename = '../data/' + sections[i] + '.json'
	global[sections[i]].sitewide = readJSONFile(filename);


	//Create JSON branch for each language
	//global.overview[language] = global.overview.sitewide[i];
	for (var j = 0; j<global.overview.sitewide.length; j++){
		var language = global.overview.sitewide[j].language;
		global[sections[i]][language] = global[sections[i]].sitewide[j];
	}
}

//Used in the loop on the index page of ebook translations
global.languages = [];
for (var i = 0; i<global.overview.sitewide.length; i++){
	var language = global.overview.sitewide[i].language;
	global.languages[i]=language;
}


//Toggle for offline use; ignores Google spreadsheet request.
var offlineMode=false;


//Add a timer to periodically update data for edits.
//20000 = 20 seconds; 60000 = 1 minute ; 300000 = 5 minutes
//setInterval(fetchData, 20000);
fetchData();

//Load data from google spreadsheet and write it to JSON files.
function fetchData(){
	if (!offlineMode){
		console.log('loading spreadsheet data.')
		//var spreadsheet_URL = 'https://docs.google.com/spreadsheets/d/123DWrahipU6XOVjnVdTd0kdOBFBlzXuxButFymJ-OmA/pubhtml';//original
		var spreadsheet_URL = '1oMDOK6jxU-um8T1SP3CwxGbNTDRxeuHSSuiU7owaY78';//revised


		var myData;
		function onLoad(data, tabletop) {
			console.log("loading, updating and saving data from spreadsheet");

			for (var i = 0; i<sections.length; i++){
				//create JSON branch for each language
				//global.overview[language] = global.overview.sitewide[i];


				for (var j = 0; j<global.overview.sitewide.length; j++){
					var language = global.overview.sitewide[j].language;
					global[sections[i]][language] = global[sections[i]].sitewide[j];
				}
			}

			//Write updated data to .JSON files and update global variables.
			var currentNumber=0;
			function writeJSON(){
				if(currentNumber<sections.length){
					//currently outputting these to a folder in the parent directory
					//for integration with Jekyll template
					var filename = '../../_data/' + sections[currentNumber] + '.json'
					
					jf.writeFile(filename, data[sections[currentNumber]].elements, function(err) {
						global[sections[currentNumber]].sitewide = readJSONFile(filename);

						currentNumber++;
						writeJSON();
					})
				} else {
					process.exit();
				}
			}
			writeJSON();
			console.log("done");
		};

		var options = {
			key: spreadsheet_URL,
			callback: onLoad
		};

		Tabletop.init(options);
	}
}


module.exports = app;
