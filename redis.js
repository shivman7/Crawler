var redis = require("redis"),
    
client = redis.createClient();

function connect() {
    return new Promise(function (resolve, reject) {
        client.on('ready',function () {
            resolve();
        });
        client.on('error',function (err) {
            reject(err);
        });
    })
}

function getValue() {

}

function setValue() {

}

module.exports = { 
    connect : connect,
    getValue : getValue,
    setValue : setValue
}