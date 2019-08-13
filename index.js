const request = require("request-promise");
const cheerio = require("cheerio");
const fs = require("fs");
const ip = require("ip");

function timeOutTest() {
    // Will resolve after 5000ms
    let id;
    let promiseA = new Promise((resolve, reject) => {
    id = setTimeout(() => {
      resolve('Promise A Wins!')
  }, 2000)
    })

    // Will resolve after 200ms
    let promiseB = new Promise((resolve, reject) => {
    id1 = setTimeout(() => {
        var x = 5 + 7;
        resolve(x);
  }, 200)
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
    console.log(message);
}

runTimeout();
