var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// create new "headlineSchema" Schema
var headlineSchema = new Schema({
    headline: {
        type: String,
        required: true,
        unique:true
    },
    summary: {
        type: String,
        required: true
    },
    date: String,
    saved: {
        type: Boolean,
        default: false
    }
});

var Headline = mongoose.model("HeadlineModel", headlineSchema);

module.exports = Headline;