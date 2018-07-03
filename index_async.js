let redis = require('./redis.js');
let crawler = require('./crawler_async.js');

(async function crawl() {
    await redis.connect()
    crawler.startCrawling('https://www.medium.com');
})();