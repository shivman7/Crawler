let redis = require("redis");
    
const client = redis.createClient();

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
    getValue : getValue,
    setValue : setValue,
    setParams : setParams
};