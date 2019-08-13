const request = require("request-promise");
const fs = require("fs");

function proxyAndTimeoutRace() {
    let id;
    let proxyTimeout = new Promise((resolve, reject) => {
    id = setTimeout(() => {
      resolve('Failed');
  }, 2000)
    })

    let proxyPicked = new Promise(async (resolve, reject) => {
        const proxyList = fs.readFileSync('proxyList.txt').toString().split("\n");
        proxyList.pop();
        const randomProxy = proxyList[Math.floor(Math.random() * proxyList.length)];
        console.log("Random Proxy: " + randomProxy);
        const htmlResult = await request({
            url : "https://www.landwatch.com",
            method : "GET",
            proxy : "http://" + randomProxy,
        });
        resolve(randomProxy);
    })

    // Let's race our promises
    return Promise.race([
    proxyTimeout,
    proxyPicked
  ]).then((result) => {
    clearTimeout(id);
    return result;
  })
}

async function findProxy() {
    var message = await proxyAndTimeoutRace();
    if (message == 'Failed') {
        console.log('Retrying...')
        findProxy();
    }
    else {
    console.log('Working proxy found!: ' + message);
    return message;
    }
}

async function run() {
    var proxy = await findProxy();
    console.log('The proxy in the variable is: ' + proxy);
}

run();
