var redis = require('./redis.js');
var crawler = require('./crawler.js');

redis.connect().then(() => {
    crawler.bfsCrawler('https://medium.com/s/futurehuman/reversed-aging-pig-organs-and-the-future-of-humankind-50f1cdb1e014');
}, (err) => {
    console.log(err);
})