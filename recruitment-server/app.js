let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let session = require('express-session');

let index = require('./routes/index');
let jobseekers = require('./routes/jobseekers');
let companies = require('./routes/companies');
let resumes = require('./routes/resumes');
let admins = require('./routes/admins');

let app = express();

let mongoose = require('mongoose');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser('recruitment-server'));
app.use(session({
    secret: 'recruitment-server',
    resave: true,
    saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'public')));
// app.use((req, res, next) => {
//     if (req.session.admin) {
//         next();
//     } else {
//         res.render('login');
//     }
// });
app.use('/', index);
app.use('/jobseekers', jobseekers);
app.use('/companies', companies);
app.use('/resumes', resumes);
app.use('/admins', admins);

app.use(function (req, res) {
    res.render('404')
});

app.use(function (err, req, res) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

mongoose.connect('mongodb://127.0.0.1:27017/recruitment');

mongoose.connection.on('connected', () => {
    console.log('数据库连接成功!')
});

mongoose.connection.on('disconnected', () => {
    console.log('数据库连接失败!')
});

mongoose.connection.on('error', () => {
    console.log('数据库连接失败!')
});

console.log('启动成功，监听3000端口');

module.exports = app;
