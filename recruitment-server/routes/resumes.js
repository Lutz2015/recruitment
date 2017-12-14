let express = require('express');
let router = express.Router();
let utils = require('../common/js/utils');
let Resumes = require('../models/resume');


router.get('/getResumes', (req, res) => {
    let jobSeekerId = req.query.jobSeekerId;
    if (!jobSeekerId) {
        utils.error(res);
    } else {
        utils.findAll(Resumes)
            .then(data => {
                utils.success(res, data)
            })
            .catch(err => {
                utils.error(res, err.message)
            })
    }
});

router.post('/deleteResume', (req, res) => {
    let resumeId = req.body.resumeId;
    if (!resumeId) {
        utils.error(res);
    } else {
        utils.remove(Resumes, {_id: resumeId})
            .then(data => {
                utils.success(res, data)
            })
            .catch(err => {
                utils.error(res, err.message)
            })
    }
});

router.post('/modifyJobIntention', (req, res) => {
    let {
        resumeId, lowSalary, highSalary, jobName, typeOfWork, summary
    } = req.body;
    if (!resumeId || !lowSalary || !highSalary || !jobName || !typeOfWork) {
        utils.error(res)
    } else {
        utils.update(Resumes, {_id: resumeId}, {lowSalary, highSalary, jobName, typeOfWork, summary})
            .then(data => {
                utils.success(res, data)
            })
            .catch(err => {
                utils.error(res, err.message)
            })
    }
});

router.post('/addResume', (req, res) => {
    let jobSeekerId = req.body.jobSeekerId;
    if (!jobSeekerId) {
        utils.error(res)
    } else {
        utils.add(Resumes, {
            jobSeekerId,
            updateTime: Date.now()
        })
            .then(data => {
                utils.success(res, data)
            })
            .catch(error => {
                utils.error(res, error.message)
            })
    }
});

router.post('/modifyResume', (req, res) => {
    let {resumeId, data, key} = req.body;
    if (!resumeId || !data || !key) {
        utils.error(res)
    } else {
        if (key !== 'evaluation' && key !== 'resumeName')
            data = JSON.parse(data);
        let update = {updateTime: Date.now()};
        update[key] = data;
        utils.update(Resumes, {_id: resumeId}, update)
            .then(data => {
                utils.success(res, data)
            })
            .catch(error => {
                utils.error(res, error.message)
            })
    }
});

module.exports = router;