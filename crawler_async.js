let scrapper = require('./scrapper.js');
let request_promise = require('request-promise');
let redis = require('./redis.js');

var currentRunning = 0;
const requestQueue = [];
const maxConcurrent = 5;
const countKey = '_count';
const paramsKey = '_params';
const validUrl=/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g;

async function bfsCrawler() {
    let request = requestQueue.shift();
    try {
        let value = await redis.getValue(countKey, request.url);
        if(value) {
            try {
                await redis.setValue(countKey, request.url, parseInt(value) + 1);
                await redis.setParams(paramsKey, request.url, request.params);
            } catch(err) {
                console.log(err);
            }
            if(requestQueue.length > 0) {
                currentRunning--;
                nextRequest();
                // bfsCrawler();
            } else {
                console.log('Crawling Finished!')
            }
        } else {
            try {
                await redis.setValue(countKey, request.url, 1);
                await redis.setParams(paramsKey, request.url, request.params);    
            } catch(err) {
                console.log(err);
            }
            try {
                let html = await request_promise.get(request.url);
                let urls = scrapper.getUrlsFromBody(html);
                urls.forEach((eachUrl) => {
                    if(validUrl.test(eachUrl.url)) {
                    requestQueue.push(eachUrl);
                    }
                });
                if(requestQueue.length > 0) {
                currentRunning--;
                nextRequest();
                // bfsCrawler();
                } else {
                    console.log('Crawling Finised!');
                }
            } catch(err) {
                console.log("Erroed URL " + request.url);
                if(requestQueue.length > 0) {
                    currentRunning--;
                    nextRequest();
                    // bfsCrawler();
                } else {
                    console.log('Crawling Finised!');
                }
            }
        }
    } catch(err) {
        console.log(err);
    }
}

function nextRequest() {
    if (currentRunning < maxConcurrent) {
        while (currentRunning <= maxConcurrent)
          {
            if(requestQueue.length == 0) { break; }
            currentRunning++;
            bfsCrawler();
          }
    }
}

function startCrawling(url) {
    requestQueue.push({'url' : url, 'params' : []});
    bfsCrawler();
}

module.exports = {
    startCrawling : startCrawling
};