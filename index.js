var redis = require('./redis.js')
var crawler = require('./crawler.js')

redis.connect().then(() => {
    crawler.bfsCrawler('https://medium.com');
}, (err) => {
    console.log(err);
});