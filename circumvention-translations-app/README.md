# circumventing-censorship #

VOA created [a website](http://projects.voanews.com/circumvention/) promoting online tools to help people circumvent government censorship efforts. We needed a way to simplify the addition and editing of meta data and translations. 

I originally created a couple of [tools](https://github.com/bbgvisualjournalist/download-circumvention-ebooks) for packaging up the translations into a series of epubs. This app is a simplified version of that tool, designed to grab the Google spreadsheet data and save it locally as a series of JSON files.

### How it works ###
A Google spreadsheet to provide the translations and metadata. [The spreadsheet](https://docs.google.com/spreadsheets/d/123DWrahipU6XOVjnVdTd0kdOBFBlzXuxButFymJ-OmA/pubhtml) has sheets for each circumvention tool as well as general translations. We shared the document with editors who can provide translations and corrections. 

I'm using [Tabletop.js](https://github.com/jsoma/tabletop) to simplify working with the published spreadsheet. I save the data to a series of JSON files. ---I use setInterval to periodically update the files with edits from the spreadsheets.---

### Running the app ###

To run the application, download the JSON and serve the files:

* Switch to the `bin` directoy `$ cd circumvention-translations-app/bin`
* run `$ node www`