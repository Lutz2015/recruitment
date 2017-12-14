/**
 * Created by Logan on 2017/11/21.
 */
let mongoose = require('mongoose');

module.exports = mongoose.model('Visit', new mongoose.Schema({
    from: [
        {
            type: String,
            id: String
        }
    ],
    to: [
        {
            type: String,
            id: String
        }
    ],
    time: String
}));
