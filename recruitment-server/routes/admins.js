let express = require('express');
let router = express.Router();
let Admins = require('../models/admin');
let utils = require('../common/js/utils');

router.post('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    if (!username || !password) {
        utils.error(res);
    } else {
        utils.findOne(Admins, {username, password})
            .then(data => {
                req.session.admin = data;
                utils.success(res, data)
            })
            .catch(err => {
                utils.error(res, err.message)
            })
    }
});

router.post('/logout', (req, res) => {
    if (req.session.admin) {
        req.session.admin = null;
        utils.success(res, 'admin logout success.')
    } else {
        utils.error(res, 'admin logout fail.')
    }
});

router.post('/addAdmin', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    if (!username || !password) {
        utils.error(res)
    } else {
        utils.add(Admins, {username, password, createTime: Date.now()})
            .then(data => {
                utils.success(res, data)
            })
            .catch(err => {
                utils.error(res, err.message)
            })
    }
});

module.exports = router;