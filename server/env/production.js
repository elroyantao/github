var path = require('path');
var assets = require(path.resolve('./public/webpack-assets.json'));

module.exports = {
    js: [
        '/dist/' + assets.vendor.js,
        '/dist/' + assets.app.js
    ],
    css: {
        main: '/dist/' + assets.app.css
    }
};
