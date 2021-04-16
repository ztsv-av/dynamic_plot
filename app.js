var express = require('express');
var path = require('path');
var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// app.post('/api', (request, response) => {
//   console.log('i got it')
//   console.log(request);
  // const output = request.body
  // response.json();({
  //   status:  "success",
  //   data: output
  // })
// })

module.exports = app;