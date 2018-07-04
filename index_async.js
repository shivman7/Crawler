let redis = require('./redis.js');
let crawler = require('./crawler_async.js');

(async function crawl() {
    try {
        await redis.connect();
        await redis.clearRedis();
    } catch(err) {
        console.log(err);
    }
    crawler.startCrawling('https://www.medium.com');
})();