let express = require('express');
let router = express.Router();
let company = require('../models/company');
let menu = require('../common/js/menu');
let utils = require('../common/js/utils');

router.get('/', function (req, res) {
    utils.findPagination(company, {})
        .then(data => {
            res.render('company/index', {
                menu: menu.getMenu('/companies'),
                data
            });
        })
        .catch(error => {
            res.render('company/index', {
                menu: menu.getMenu('/companies'),
                data: utils.getError(error.message)
            })
        })

});

module.exports = router;