/**
 * Created by Logan on 2017/10/23.
 */
let mongoose = require('mongoose');

let company = mongoose.model('Company', new mongoose.Schema({
    companyId: String,
    name: String,
    desc: String,
    createTime: String,
    type: String,
    address: String,
    applyCount: String,
    contactInfo: {
        name: String,
        sex: String,
        phone: String
    },
    visitors: Array,
    visit: Array,
    applyList: [
        {
            userId: String,
            jobId: String,
            time: String,
            status: String
        }
    ]
}));
module.exports = company;
