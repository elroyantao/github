var passport = require('passport');
var chalk = require('chalk');
var devAssets = require('./env/development');
var prodAssets = require('./env/production');

var assets = process.env.NODE_ENV === 'development' ? devAssets : prodAssets;

module.exports = function(app) {
    app.get('/auth/github', passport.authenticate('github'));

    app.get('/auth/github/callback',
        passport.authenticate('github', {
            failureRedirect: '/login'
        }),
        function(req, res) {
            // Successful authentication, redirect home.
            res.redirect('/');
        });

    app.get('/login', function(req, res) {
        if (req.user) {
            res.redirect('/');
        } else {
            res.render('login');
        }
    });

    app.get('/', function(req, res) {
        if (req.user) {
            res.render('main', {
                user: req.user,
                jsFiles: assets.js,
                cssFile: assets.css.main
            });
        } else {
            res.redirect('/login');
        }
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/login');
    });

};
