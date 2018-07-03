let redis = require("redis");
    
const client = redis.createClient({host : 'redis', port : '6379'});
const countKey = '_count';
const paramsKey = '_params';

function connect() {
    return new Promise((resolve, reject) => {
        client.on('ready',function () {
            resolve();
        });
        client.on('error',function (err) {
            reject(err);
        });
    })
}

function clearRedis() {
    return new Promise((resolve, reject) => {
        client.del(countKey, (err, value) => {
            if(err){
                reject(err);
            }
            client.del(paramsKey, (err, value) => {
                if(err) {
                    reject(err);
                }
                resolve();
            });
        });
    });
}

function getValue(key, field) {
    return new Promise((resolve,reject) => {
        client.hget(key, field, (err, value) => {
            if(err) {
                reject(err);
            }
            resolve(value);
        });
    });
}

function setValue(key, field, value) {
    return new Promise((resolve, reject) => {
        client.hset(key, field, value, (err, value) => {
            if(err) {
                reject(err);
            }
            resolve();
        });
    });
}

function setParams(key, field, params) {
    
    return new Promise((resolve, reject) => {
        getValue(key, field).then((value) => {
            if(value) {
                let paramsInRedis = [];
                let finalParams = [];
                paramsInRedis = JSON.parse(value);
                finalParams = paramsInRedis.concat(params);
                let mySet = new Set(finalParams);
                finalParams = [...mySet];
                client.hset(key, field, JSON.stringify(finalParams), (err, value) => {
                    if(err) {
                        reject(err);
                    } else {
                        // console.log('Params updated Successfully');
                        resolve();
                    }
                });
            } else {
                client.hset(key, field, JSON.stringify(params), (err, value) => {
                    if(err) {
                        reject(err);
                    } else {
                        // console.log('Params saved Successfully');
                        resolve();
                    }
                });
            }
        }, (err) => {
            console.log(err);
        });
    });
}

module.exports = { 
    connect : connect,
    clearRedis : clearRedis,
    getValue : getValue,
    setValue : setValue,
    setParams : setParams
};