var express = require('express'),
    chalk = require('chalk'),
    passport = require('passport'),
    GithubStrategy = require('passport-github').Strategy,
    consolidate = require('consolidate'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    _ = require('lodash');

var config = require('./config'),
    addRoutes = require('./routes');


var app = express();
app.set('port', (process.env.PORT || 4000));

app.engine('html', consolidate['swig']);
// Set views path and view engine
app.set('view engine', 'html');
app.set('views', __dirname + '/views');


app.use(express.static('public'));
app.use(cookieParser());

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: 'keyboard cat',
    sessionKey: 'sessionId',
    cookie: {
        maxAge: 3600 * 24,
        httpOnly: true,
        secure: false
    }
}));
passport.serializeUser(function(user, done) {
    var id = JSON.stringify(user);
    done(null, id);
});

passport.deserializeUser(function(id, done) {
    var user = JSON.parse(id);
    done(null, user);
});

app.use(passport.initialize());
app.use(passport.session());





// Use github strategy
passport.use(new GithubStrategy({
        clientID: config.github.clientID,
        clientSecret: config.github.clientSecret,
        callbackURL: 'http://localhost:4000/auth/github/callback',
        passReqToCallback: true
    },
    function(req, accessToken, refreshToken, profile, done) {
        // Set the provider data and include tokens
        var providerData = profile._json;
        providerData.accessToken = accessToken;
        providerData.refreshToken = refreshToken;
        var user = _.pick(providerData, ['login', 'id', 'avatar_url', 'html_url', 'name', 'accessToken'])
        done(null, user);

    }));

addRoutes(app);


app.listen(app.get('port'), function() {
    console.log(chalk.green('started application on port ' + app.get('port')));
    console.log(chalk.green('goto http://localhost:' + app.get('port')));
});
