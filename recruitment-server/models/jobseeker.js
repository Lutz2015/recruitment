/**
 * Created by Logan on 2017/10/23.
 */
let mongoose = require('mongoose');

let jobSeeker = mongoose.model('Jobseeker', new mongoose.Schema({
    userId: String,
    name: String,
    phone: String,
    email: String,
    password: String,
    defaultResume: String,
    birthday: String,
    sex: String,
    address: String,
    education: String,
    visitors: Array,
    visit: Array,
    favorite: Array,
    usable: Boolean,
    // 一句话告诉HR为什么选择你而不是别人
    summary: String,
    applyList: [
        {
            companyId: String,
            jobId: String,
            time: String,
            status: String
        }
    ]
}));

module.exports = jobSeeker;