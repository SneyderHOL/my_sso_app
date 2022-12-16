const passport = require('passport');
const express = require('express');

const app = express();
require('./sso');


app.use(passport.initialize());
app.use(passport.session());

app.get('/login',
  passport.authenticate('saml', { failureRedirect: '/', failureFlash: true }),
  function(req, res) {
    res.redirect('/success');
  }
);
app.get('/success',
  function(req, res) {
    res.send('success login');
  }
);
app.post('/adfs/postResponse',
  passport.authenticate('saml', { failureRedirect: '/', failureFlash: true }),
  function(req, res) {
    res.redirect('https://acme_tools.com');
  }
);
app.get('/secure', validUser, routes.secure);

function validUser(req, res, next) {
  if (!req.user) {
    res.redirect('https://acme_tools.com/login');
  }
  next();
}

const server = http.createServer(app);