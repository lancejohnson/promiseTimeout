const proxy = require("./singleProxyChecker");

async function test() {
    var testValue = await proxy.findProxyFromList('proxyList.txt');
    console.log('Returned ' + testValue);
}

test()
