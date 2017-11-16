const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + "/views/partials");
//to get started with hbs
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// })

//app.use is the call to the Express middleware that is used to fetch
//entire directories without having to specify each single file
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

//app.get is the method of the request package that retrieves data
//Two input parameters:
//  1. the URL
//  2. the function that will handle the request
//This function too has two parameters:
//  1. req: object that stores tons of info about the request; headers, body info, methods, paths...
//  2. res: stores all the methods that have to handle the response
app.get('/', (req, res) => {
//  res.send('<h1>Hello Express</h1>');
  res.render('home.hbs', {
    pageTitle: "Home Page",
    likes: "I really do like Photography, Basket and travel"
  });
});

app.get('/about', (req, res) => {
  //res.send('About Page');
  res.render('about.hbs', {
    pageTitle: "About Page",
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorCode: 404,
    errorMessage: "Whoooops, something went wrong!!"
  })
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
