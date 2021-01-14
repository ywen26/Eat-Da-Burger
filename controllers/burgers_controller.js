// Dependencies
var express = require("express");

var router = express.Router();

// Import the model to use its database functions
var burger = require("../models/burger.js");

// Create all routes and set up logic within those routes where required
router.get("/", function(req, res) {
    burger.selectAll(function(data) {
        var hbsObject = {
            burgers: data
        }
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/api/burgers", function(req, res) {
    burger.insertOne([
        "burger_name"
    ], [
        req.body.burger_name
    ], function(result) {
        res.json({ id: result.insertId });
    });
});

router.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    burger.updateOne(
        {
            devoured: req.body.devoured
        },
        condition,
        function(result) {
            if(result.changeRows === 0) {
                return res.status(404).end();
            }
            res.status(200).end();
        }
    );
});

router.delete("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    burger.deleteOne(condition, function(result) {
        if (result.affectedRows === 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

// Export routes for server.js to use
module.exports = router;
