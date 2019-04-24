module.exports = function(router) {
// renders the homepage
    router.get("/", function(req, res) {
        res.render("home");
    });

    // renders the saved page
    router.get("/saved", function(req, res) {
        res.render("saved");
    });
}