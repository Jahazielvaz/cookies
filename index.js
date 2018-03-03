const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const session = require('express-session');

const app = express();

app.use(cookieParser()); //This sets our req.cookies variable
app.use(morgan("dev")); //This makes it so that it logs everything in our dev environment

//SESSION: Session requires three different things:
/*
  SECRET: Is a keycode for what it's going to use on your cookies
    You can just use any string of text.
  SAVEUNINITIALIZED: This is when you're saving those sessions to some kind of permanent storage, like a db
    So you have persistent logging even if your server goes down, when it comes back up, your users will still be logged in.
    In order for this effect to be active, saveUninitialized needs to be set to true.
  RESAVE: This is saying that even if nothing's changed, go ahead and save it again.

  NOTICE: You don't actually need cookie-parser anymore, since session can read and parse the cookies by itself, but the nice thing about cookie-parser, is that it stores the cookie, in a req.cookie.
*/

app.use(session({secret: 'anyStringOfTextIWant',
                 saveUninitialized: true,
                 resave: true
                }))


//THIRD ARGUMENT IS YOUR OPTIONS. IT'S A PERMANENT COOKIE. IT'S NOT TIME BASED
app.use('/', function(req, res){
  res.send('THIS IS MY AWESOME PAGE!')
  console.log(req.cookies);
  console.log('===============================');
  console.log(req.session);

})

//REMOVING A COOKIE
app.get('/removingCookie', function(req, res){
  res.clearCookie('myFirstCookie');
  res.end('I did it')
})

app.listen(3000, function(){
  console.log('Port is working. 3000');
})
