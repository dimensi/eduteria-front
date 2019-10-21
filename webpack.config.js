const path = require('path');

/**
 * Файл нужен чтоб idea редакторы могли определять существования алиасов. По другому им не объяснить.
 * @type {{resolve: {alias: {src: *}}}}
 */
module.exports = {
    resolve: {
        alias: {
            src: path.resolve(__dirname, 'src'),
        },
    },
};
