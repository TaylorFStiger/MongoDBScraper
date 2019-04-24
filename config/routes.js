var scrape = require("../scripts/scrape");

var headlinesController = require("../controllers/headlines");
var notesController = require("../controllers/notes");

module.exports = function (router) {
    // renders the homepage
    router.get("/", function (req, res) {
        res.render("home");
    });

    // renders the saved page
    router.get("/saved", function (req, res) {
        res.render("saved");
    });

    router.get("/api/fetch", function (req, res) {
        headlinesController.fetch(function (err, docs) {
            if (!docs || docs.insertedCount === 0) {
                res.json({
                    message: "No new articles sorry. Check back soon!"
                });
            }
            else {
                res.json({
                    message: "added " + docs.insertedCount + " new articles!"
                });
            }
        });
    });
    router.get("/api/headlines", function (req, res) {
        var query = {};
        if (req.query.saved) {
            query = req.query;
        }

        headlinesController.get(query, function (data) {
            res.json(data);
        });
    });
    router.delete("/api/headlines/:id", function (req, res) {
        var query = {};
        query._id = req.params.id;
        headlinesController.delete(query, function (err, data) {
            res.json(data);
        });
    });

    router.patch("/api/headlines", function (req, res) {
        headlinesController.update(req.body, function (err, data) {
            res.json(data);
        });
    });
    router.get("/api/notes/:headline_id?", function (req, res) {
        var query = {};

        if (req.params.headline_id) {
            query._id = req.params.headline_id;
        }
        notesController.get(query, function (err, data) {
            res.json(data);
        });
    });
};
