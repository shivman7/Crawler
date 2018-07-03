var scrapper = require('./scrapper.js');
var request_promise = require('request-promise');

var currentRunning = 0;
var requestQueue = [];
const maxConcurrent = 5;

function bfsCrawler(url) {
    console.log(url)
    request_promise.get(url).then(html => {
        scrapper.getUrlsFromBody(html);
    }); 
}

function nextRequest() {
}

module.exports = {
    bfsCrawler : bfsCrawler
};