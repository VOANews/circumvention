# Circumvention project (compiled via Jekyll) #

This is a refactored version of the ["VOA Circumventing Censorship"](http://projects.voanews.com/circumvention) project to help simplify the translation and maintenance of the project. 



### Issues and updates ###

Any suggestions for updates, corrections or clarifications can be submitted as a [Github issue](https://github.com/voanews/circumvention/issues).



### How it works ###

Jekyll is used to bake out static HTML from markdown files with post-level data and JSON files with the comic book translations. 

Each language has its own folder (e.g. '/russian/') with a '/_posts/' folder. By keeping the markdown files for the translations in those folders the site will preserve the site structure. Each translation .md file has an include at the topic for the appropriate comic: '{% include comic__dns.html %}'. The language variables for the comic are passed in via a post variable at the top `langnumber: 5`.

The comic book templates are stored in the '_includes' folder. The JSON of the translations for the comics (and metadata) is stored in the '_data' folder in individual .json files (e.g. 'dns.json'). The actual translations are stored and edited in a Google spreadsheet.

The instructions for updating the comic book translations are found in the `/circumvention-translations-app/README.md` file.