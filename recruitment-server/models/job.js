/**
 * Created by Logan on 2017/10/26.
 */
let mongoose = require('mongoose');

module.exports = mongoose.model('Resume', new mongoose.Schema({
  companyId: String,
  jobId: String,
  name: String,
  time: String,
  education: String,
  needCount: Number,
  detail: String,
  contactInfo: String,
  applyCount: Number,
  lowSalary: Number,
  highSalary: Number,
  exp: String,
  applyList: [
    {
      userId: String,
      jobId: String,
      time: String,
      status: String
    }
  ]
}));
