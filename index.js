let redis = require('./redis.js');
let crawler = require('./crawler.js');

redis.connect().then(() => {
    redis.clearRedis().then(() => {
        crawler.startCrawling('https://www.medium.com');
    }, (err) => {
        console.log(err);
    });   
}, (err) => {
    console.log(err);
});