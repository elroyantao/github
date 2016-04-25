var express = require('express'),
  chalk = require('chalk'),
  passport = require('passport'),
  GithubStrategy = require('passport-github').Strategy,
  config = require('./config'),
  consolidate = require('consolidate');


var app = express();

app.engine('html', consolidate['swig']);

// Set views path and view engine
app.set('view engine', 'html');
app.set('views', __dirname+'/views');





// Use github strategy
passport.use(new GithubStrategy({
  clientID: config.github.clientID,
  clientSecret: config.github.clientSecret,
  callbackURL: 'http://127.0.0.1:4000/auth/github/callback',
  passReqToCallback: true
},
function (req, accessToken, refreshToken, profile, done) {
  // Set the provider data and include tokens
  // console.log(chalk.red(JSON.stringify(profile)));

  var providerData = profile._json;
  providerData.accessToken = accessToken;
  providerData.refreshToken = refreshToken;
  console.log(chalk.red(JSON.stringify(accessToken)));

  // // Create the user OAuth profile
  // var displayName = profile.displayName ? profile.displayName.trim() : profile.username.trim();
  // var iSpace = displayName.indexOf(' '); // index of the whitespace following the firstName
  // var firstName = iSpace !== -1 ? displayName.substring(0, iSpace) : displayName;
  // var lastName = iSpace !== -1 ? displayName.substring(iSpace + 1) : '';
  //
  // var providerUserProfile = {
  //   firstName: firstName,
  //   lastName: lastName,
  //   displayName: displayName,
  //   email: profile.emails[0].value,
  //   username: profile.username,
  //   // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
  //   profileImageURL: (providerData.avatar_url) ? providerData.avatar_url : undefined,
  //   // jscs:enable
  //   provider: 'github',
  //   providerIdentifierField: 'id',
  //   providerData: providerData
  // };
  //
  // // Save the user OAuth profile
  // users.saveOAuthUserProfile(req, providerUserProfile, done);
}));


app.get('/auth/github',
  passport.authenticate('github') );

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    console.log('callback');
    // Successful authentication, redirect home.
    res.redirect('/');

  });

app.get('/login',function(req,res){
  // console.log();
  res.render('login');
});

app.get('/',function(req,res){
  res.render('main');
});

app.listen(4000,function(){
  console.log('started');
})
