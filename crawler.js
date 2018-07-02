var model = require('./models/model.js')

var currentRunning = 0;
var requestQueue = [];
const maxConcurrent = 5;

function bfsCrawler(url) {
    requestQueue.shift();
}

function nextRequest() {
}

module.exports = {
    bfsCrawler : bfsCrawler
}