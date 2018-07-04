let redis = require('./redis.js');
let crawler = require('./crawler.js');

redis.connect()
    .then(redis.clearRedis())
    .then(crawler.startCrawling('https://www.medium.com'))
    .catch((err) => { console.log(err); })