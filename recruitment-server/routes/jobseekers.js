let express = require('express');
let router = express.Router();
let menu = require('../common/js/menu');
let utils = require('../common/js/utils');
let jobSeeker = require('../models/jobseeker');
/**
 * 获取用户管理页面
 */
router.get('/', (req, res) => {
    utils.findPagination(jobSeeker, {})
        .then(data => {
            res.render('jobseeker/index', {
                menu: menu.getMenu('/jobseekers'),
                data: utils.getSuccess(data),
            });
        })
        .catch(() => {
            res.render('error')
        })
});
/**
 * 检查手机号是否存在
 */
router.get('/checkPhone', (req, res) => {
    let phone = req.query.phone;
    if (!phone) {
        utils.error(res)
    } else {
        utils.findOne(jobSeeker, {
            phone
        })
            .then(data => {
                utils.success(res, data && data.phone)
            })
            .catch(err => {
                utils.error(res, err.message)
            });
    }
});
/**
 * 增加求职者（用户）信息
 */
router.post('/addJobSeeker', (req, res) => {
    let phone = req.body.phone;
    let password = req.body.password;
    if (!phone || !password) {
        utils.error(res)
    } else {
        utils.add(jobSeeker, {
            phone,
            password,
            usable: true,
            userId: Date.now()
        })
            .then(data => {
                utils.success(res, data)
            })
            .catch(error => {
                utils.error(res, error.message)
            });
    }
});
/**
 * 分页获取求职者（用户）信息
 */
router.get('/getJobSeekers', (req, res) => {
    let page = parseInt(req.query.page || 1);
    let pageSize = parseInt(req.query.pageSize || 10);
    let keyword = req.query.keyword;
    let searchMode = req.query.searchMode || 'all';
    let conditions = {};
    if (searchMode !== 'all') {
        conditions[searchMode] = new RegExp(keyword);
    }
    utils.findPagination(jobSeeker, conditions, page, pageSize)
        .then(data => {
            utils.success(res, data);
        })
        .catch(error => {
            utils.error(res, error.message);
        })
});
/**
 * 修改求职者信息
 */
router.post('/modifyJobSeeker', (req, res) => {
    let _id = req.body._id;
    if (!_id) {
        utils.error(res)
    } else {
        let email = req.body.email;
        let address = req.body.address;
        let usable = req.body.usable;
        let update = {};
        email && (update.email = email);
        address && (update.address = address);
        usable && (update.usable = (usable === "1"));
        utils.update(jobSeeker, {
            _id
        }, update)
            .then(data => {
                utils.success(res, data)
            })
            .catch(err => {
                utils.error(res, err.message)
            })
    }
});

/**
 * 后台获取用户信息接口
 */
router.get('/info', (req, res) => {
    let _id = req.query._id;
    if (!_id) {
        utils.error(res)
    } else {
        utils.findOne(jobSeeker, {
            _id
        })
            .then(data => {
                res.render('jobseeker/info', {
                    data
                })
            })
            .catch(() => {
                res.render('error')
            })
    }
});
// // TODO 整合到获取用户信息中
// router.get('/info/resumes', (req, res) => {
//     let _id = req.query._id;
//     if (!_id) {
//         utils.error(res)
//     } else {
//         utils.findOne(jobSeeker, {
//             _id
//         })
//             .then(data => {
//                 res.render('jobseeker/resume', {
//                     data
//                 })
//             })
//             .catch(() => {
//                 res.render('error')
//             })
//     }
// });

router.post('/modifyBaseInfo', (req, res) => {
    let {
        _id,
        name,
        birthday,
        email,
        address,
        sex
    } = req.body;
    if (!_id || !name || !birthday || !email || !address || !sex) {
        utils.error(res);
    } else {
        utils.update(jobSeeker, {
            _id
        }, {
            name,
            birthday,
            email,
            address,
            sex
        })
            .then(data => {
                utils.success(res, data);
            })
            .catch(error => {
                utils.error(res, error.message);
            })
    }
});

router.post('/changeDefaultResume', (req, res) => {
    let {jobSeekerId, resumeId} = req.body;
    if (!jobSeekerId || !resumeId) {
        utils.error(res);
    } else {
        utils.update(jobSeeker, {_id: jobSeekerId}, {defaultResume: resumeId})
            .then(data => {
                utils.success(res, data);
            })
            .catch(error => {
                utils.error(res, error.message);
            })
    }
});


router.post('/login', (req, res) => {
    let phone = req.body.phone;
    let password = req.body.password;
    if (!phone || !password) {
        utils.error(res)
    } else {
        utils.findOne(jobSeeker, {phone, password})
            .then(data => {
                req.session.jobSeeker = data;
                utils.success(res, data);
            })
            .catch(error => {
                utils.error(res, error.message);
            })
    }
});

router.post('/logout', (req, res) => {
    if (!req.session.jobSeeker) {
        utils.error(res, 'job seeker logout fail.')
    } else {
        req.session.jobSeeker = null;
        utils.success(res, 'job seeker logout success.')
    }
});

module.exports = router;