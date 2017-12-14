let mongoose = require('mongoose');

module.exports = mongoose.model('Admin', new mongoose.Schema({
    jobSeekerId: String,
    username: String,
    password: String,
    createTime: String
}));