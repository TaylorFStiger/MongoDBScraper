$(document).ready(function () {

    var articleContainer = $(".article-container");
    $(document).on("click", ".btn.save", handleArticleSave);
    $(document).on("click", ".scrape-new", handleArticleScrape);
    // once page is ready, run the initPage function 
    initPage();
    // empty the article container, run an AJAX request for any unsaved headlines
    function initPage() {

        articleContainer.empty();
        $.get("/api/headlines?saved=false")
            .then(function (data) {
                if
                    // if we have headlines, render to the page
                    (data && data.length) {
                    renderArticles(data);
                }
                else {
                    renderEmpty();
                }
            });
    }

    function renderArticles(articles) {
        // appends HTML containing our article data to the page
        var articlePanels = [];
        // we passed each article JSON object to the createPanel function which returns a bootstrap panel with our article data inside
        for (var i = 0; i < articles.length; i++) {
            articlePanels.push(createPanel(articles[i]));
        }
        // once we have all of the HTML for the articles stored in our articlePanels array, append them to the articlePanels container
        articleContainer.append(articlePanels);
    }

    function createPanel(article) {
        // This function takes in  single JSON object for an article/headline. 
        // it constructs a jQuery element containing all of the formatted HTML for the article panel
        var panel =
            $(["<div class='panel panel-default'>",
                "<h3>", article.headline,
                "<a class='btn btn-success save'>", "Save Article", "</a>", "</h3>", "</div>", "<div class='panel-body'>", article.summary, "</div>", "</div>"].join(""));
        // we attach the article's id to the jQuery element
        // we will use this when tryin to figure out which article the user wants to save
        panel.data("_id", article._id);
        // we return the constructed panel jQuery element
        return panel;
    }

    function renderEmpty() {
        // this function renders some HTML to the page explaining we don't have any articles to view
        var emptyAlert =
            $(["<div class='alert alert-warning text-center'>", "<h4>Uh Oh. Looks like we don't have any new articles.</h4>", "</div>", "<div class='panel panel-default'>", "<div class='panel-heading text-center'>", "<h3>What Would You Like To Do?</h3>", "</div>", "<div class='panel-body text-center'>", "<h4><a class='scrape-new'>Try Scraping New Articles</a></h4>", "<h4><a href='/saved'>Go to Saved Articles</a><h4>", "</div>", "</div>"].join(""));

        articleContainer.append(emptyAlert);
    }

    function handleArticleSave() {
        var articleToSave = $(this).parents(".panel").data();
        articleToSave.saved = true;

        $.ajax({
            method: 'PATCH',
            url:'/api/headlines',
            data: articleToSave
        })
        .then(function(data) {
            if(data.ok) {
                initPage();
                
            }
        });
    }

    function handleArticleScrape() {
        
        $.get("/api/fetch")
        .then(function(data) {

            initPage();
            bootbox.alert("<h3 class='text-center m-top-80'>" + data.message + "<h3>");
        });
    }

});