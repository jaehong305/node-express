const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const fs = require('fs');

app.set('views', __dirname + '/views');
app.set('view engine', 'html'); // ejs 확장자 대신
app.engine('html', require('ejs').renderFile);

const server = app.listen(3000, function () {
  console.log('Express server has started on port 3000');
});

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(
  session({
    secret: '@#@MYSIGN', // 쿠키 변조 방지 sign값
    resave: false, // 변경되지 않으면 세션 저장 X
    saveUninitialized: true, // 새로 생겼지만 변경되지 않은 세션 저장
  })
);

const router = require('./router/index')(app, fs); // bodyParser 아래 위치
