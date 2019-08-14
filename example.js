const proxy = require("./singleProxyChecker");

async function test() {
    var testValue = await proxy.findProxyFromList('../python-proxy-checker/output/out_filtered2.txt');
    console.log('Returned ' + testValue);
}

test()
