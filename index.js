const request = require("request-promise");
const cheerio = require("cheerio");
const fs = require("fs");
const ip = require("ip");

function timeOutTest() {
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
        const $ = await cheerio.load(htmlResult);
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

async function runTimeout() {
    var message = await timeOutTest();
    if (message == 'Failed') {
        console.log('Retrying...')
        runTimeout();
    }
    else {
    console.log(message);}
}

runTimeout();
