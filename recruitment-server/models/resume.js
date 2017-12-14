/**
 * Created by Logan on 2017/10/26.
 */
let mongoose = require('mongoose');

module.exports = mongoose.model('Resume', new mongoose.Schema({
    jobSeekerId: String,
    resumeName: String,
    // 职位名称
    jobName: String,
    // 工作类型
    jobOfType: String,
    lowSalary: Number,
    highSalary: Number,
    typeOfWork: String,
    summary: String,
    projects: [
        {
            date: String,
            name: String,
            company: String,
            desc: String
        }
    ],
    skills: [
        {
            name: String,
            level: Number
        }
    ],
    educations: [
        {
            date: String,
            school: String,
            major: String,
            degree: String
        }
    ],
    works: [
        {
            date: String,
            company: String,
            job: String,
            desc: String
        }
    ],
    honors: [
        {
            honor: String,
        }
    ],
    evaluation: String,
    updateTime: String
}));
