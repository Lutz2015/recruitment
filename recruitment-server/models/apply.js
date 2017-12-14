/**
 * Created by Logan on 2017/11/21.
 */
let mongoose = require('mongoose');

module.exports = mongoose.model('Apply', new mongoose.Schema({
    jobSeekerId: String,
    companyId: String,
    jobId: String,
    time: String,
    status: String
}));