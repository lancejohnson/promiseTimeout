const request = require("request-promise");
const cheerio = require("cheerio");
const fs = require("fs");
const ip = require("ip");

function timeOutTest() {
    // Will resolve after 10000ms
    let id;
    let promiseA = new Promise((resolve, reject) => {
    id = setTimeout(() => {
      resolve('Promise A Wins!')
  }, 10000)
    })

    // Will resolve after 200ms
    let promiseB = new Promise((resolve, reject) => {
    id1 = setTimeout(() => {
      resolve('Promise B Wins!')
  }, 200)
    })

    // Let's race our promises
    return Promise.race([
    promiseA,
    promiseB
  ]).then((result) => {
    clearTimeout(id, id1)

    /**
     * ... we also need to pass the result back
     */
    return result;
  })
}

async function runTimeout() {
    var message = await timeOutTest();
    console.log(message);
}

runTimeout();
