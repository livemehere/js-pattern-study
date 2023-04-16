exports.loaded = false;
const a = require('./a.js');
module.exports = {
    loaded:true,
    AWasLoaded:a.loaded
}
