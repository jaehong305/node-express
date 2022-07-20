const express = require('express');
const path = require('path');
const logger = require('morgan'); // 요청과 응답에 대한 정보 콘솔에 기록
const engine = require('ejs').renderFile;
const session = require('express-session'); // express프레임워크에서 세션관리 미들웨어, 사용자별로 req.session 객체에 유지, 저장(DB설정가능), 쿠키 발송 기능등
const bodyParser = require('body-parser'); // 요청 body 해석 req.body 객체로 만듦
const cookieParser = require('cookie-parser'); // 쿠키해석 => req.cookies 객체로 만듦 => express-session 모듈이 직접 쿠키에 접근하므로 express-session에 쓸때에는 필요x

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html'); // ejs 확장자 대신 html
app.engine('html', engine);

app.use(logger('dev'));
// app.use(express.json({ limit: '50mb' })); // express4.16.0 이상 부터는 body-parser 대신 express에서 제공
// app.use(express.urlencoded({ limit: '50mb', extended: false }));
app.use(bodyParser.json({ limit: '50mb' })); // limit 옵션으로 body 크기 설정
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false, parameterLimit: 50000 })); // url의 크기 설정, extended: false (node.js 내장모듈 queryString으로 파싱, true의 경우 보안기능이 확장된 npm의 qs라이브러리 설치필요), parameterLimit: URL인코딩 데이터에 허용되는 최대 매개변수 개수(기본값:1000)
app.use(cookieParser());
app.use(
  session({
    secret: 'mnex18)#)&', // 쿠키 변조 방지 sign값(세션 암호화하여 저장)
    resave: false, // request마다 세션 변경사항이 없으면 세션 다시 저장 X (true: request마다 다시 저장)
    saveUninitialized: true, // 새로 생겼지만 변경되지 않은 세션 저장 (false: 처음만들어졌을때는 저장 X, 수정(로그인등 발생)시 저장 후 쿠키 발송)
  })
);
app.use(express.static(path.join(__dirname, 'public')));

const index = require('./routes/index');
const users = require('./routes/users');

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};
  // res.locals.error = err; // res.locals 요청별로 뷰(ejs)에서 사용할 전역변수 담기 // error.html 파일 render해주지 않으면 필요X

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
  console.log(err);
  res.send(err.message);
});

module.exports = app;
