var request = require("request");
var cheerio = require("cheerio");


var scrape = function (cb) {

    request("http://www.nytimes.com", function (err, res, body) {

        var $ = cheerio.load(body);

        var articles = [];
        // grabs article class "theme-summary"
        $(".theme-summary").each(function (i, element) {
            // selects the heading and summary of the article which are children of that class
            var head = $(this).children(".story-heading").text().trim();
            var sum = $(this).children('.summary').text().trim();

            // regex method that cleans up the text whitespace and makes it neater
            if(head && sum){
                var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, "" ).trim();
                var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, "" ).trim();
                
                // makes object (dataTo Add) out of headNeat & sumNeat and assigns to attributes of headline and summary that required to create an article in our model
                var dataToAdd = {
                    headline: headNeat,
                    summary: sumNeat
                };

                // push the new dataToAdd into our articles array and continues to iterate
                articles.push(dataToAdd);
            }
        });
        // callback sends the articles array
        cb(articles);
    });
};

module.exports = scrape;