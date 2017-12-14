let express = require('express');
let router = express.Router();
let menu = require('../common/js/menu');

router.get('/', function (req, res) {
    // if (req.session.admin) {
    let val = menu.getMenu('/');
    console.log(val);
    res.render('index', {
        menu: val
    });
    // } else {
    //     res.render('login')
    // }
});

module.exports = router;
