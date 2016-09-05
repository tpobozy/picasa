var path = require('path');
var exphbs = require('express-handlebars');

module.exports = function (app) {
    app.engine('.hbs', exphbs({
        defaultLayout: 'base',
        extname: '.hbs',
        layoutsDir: path.join(__dirname, '../views/layouts')
    }));
    app.set('view engine', '.hbs');
    app.set('views', path.join(__dirname, '../views'));
};