let scrapper = require('./scrapper.js');
let request_promise = require('request-promise');
let redis = require('./redis.js');

var currentRunning = 0;
const requestQueue = [];
const maxConcurrent = 5;
const countKey = '_count';
const paramsKey = '_params';
const validUrl=/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g;

function bfsCrawler() {
    let request = requestQueue.shift();
    console.log(request);
    redis.getValue(countKey, request.url).then((value) => {
        if(value) {
            redis.setValue(countKey, request.url, parseInt(value) + 1).then(() => {
               redis.setParams(paramsKey, request.url, request.params).then(() => {
                   if(requestQueue.length > 0) {
                        bfsCrawler();
                   } else {
                        console.log('Crawling Finished!')
                   }
               }, (err) => {
                   console.log(err);
               });
            }, (err) => {
                console.log(err);
            });
        } else {
            redis.setValue(countKey, request.url, 1).then(() => {
                redis.setParams(paramsKey, request.url, request.params).then(() => {
                    request_promise.get(request.url).then(html => {
                        var urls = scrapper.getUrlsFromBody(html);
                        urls.forEach((url) => {
                            if(validUrl.test(url.url)) {
                                requestQueue.push(url);
                            }
                        });
                        if(requestQueue.length > 0) {
                            bfsCrawler();
                        } else {
                            console.log('Crawling Finised!');
                        }
                    }).catch((err) => {
                        console.log(err);
                        if(requestQueue.length > 0) {
                            bfsCrawler();
                        } else {
                            console.log('Crawling Finised!');
                        }
                    });
                }, (err) => {
                    console.log(err);
                });
            }, (err) => {
                console.log(err);
            });
        }
    }, (err) => {
        console.log(err);
    });
}

function nextRequest() {

}

function startCrawling(url) {
    requestQueue.push({'url' : url, 'params' : []});
    bfsCrawler();
}
module.exports = {
    startCrawling : startCrawling
};