const request = require("request-promise");
const cheerio = require("cheerio");
const fs = require("fs");
const ip = require("ip");

function timeOutTest() {
    let id;
    let promiseA = new Promise((resolve, reject) => {
    id = setTimeout(() => {
      resolve(Math.floor(Math.random() * Math.floor(2)));
  }, 20000)
    })

    let promiseB = new Promise((resolve, reject) => {
    id1 = setTimeout(() => {
        var x = 5 + 7;
        resolve(x);
  }, 2000)
    })

    // Let's race our promises
    return Promise.race([
    promiseA,
    promiseB
  ]).then((result) => {
    clearTimeout(id);
    clearTimeout(id1)

    return result;
  })
}

async function runTimeout() {
    var message = await timeOutTest();
    if (message == 1) {
        runTimeout();
    }
    console.log(message);
}

runTimeout();
