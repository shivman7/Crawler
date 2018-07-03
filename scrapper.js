var arr = [];

function getUrlsFromBody(html) {
    const regex = /href=\"(\S+)\"/g;
    let urls =[];
    let match;
    while((match = regex.exec(html)) !== null){
        urls.push(match[1]);
    }
    // urls = [ 'https://medium.com/some/thing', 'https://medium.com/some/thing?param1=abc', 'https://medium/com/some/thing?param2=xyz', 'https://medium/com/some/thing?param1=def&param3=xxx'];
    if(urls) {
        urls.forEach(url => {
            arr.push({url : url, params : getParamsFromUrl(url)});
        });
    }console.log(arr)
    return arr;
}

function getParamsFromUrl(url) {
    var paramString = url.split('?');
    if (paramString.length >= 2) {
       var params = paramString[1].split('&').map((param) => {
            return param.split('=')[0];
        });
        return params;
    } else {
        return [];
    }
}

module.exports = {
    getUrlsFromBody : getUrlsFromBody
};