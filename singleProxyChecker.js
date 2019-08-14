const axios = require("axios");
const fs = require("fs");
const url = require("url");

function findAvailableProxy(randomProxy) {
  return new Promise((resolve, reject) => {
    // Axios requires the host and port name options so I'm using Node's url library to
    // parse the proxyList.txt. NOTE: I had to add http:// to the proxy servers in the text file. You
    // could do that programmatically as well if you wanted.
    const proxyUrl = url.parse('http://' + randomProxy);
    debugger;

    console.log("Random Proxy: " + randomProxy);

    req = axios({
        url: "https://www.landwatch.com",
        method: "GET",
        proxy: {
          host: proxyUrl.hostname,
          port: proxyUrl.port
        },
        timeout: 1000, // Bad proxys will cause your request to hang
      })
      .then((response) => {
        // Here you can use Cheerio
        resolve(randomProxy)
      })
      .catch((err) => {
        reject("Failed")
      })
  })
}
async function run() {
  const proxyList = fs.readFileSync('proxyList.txt').toString().split("\n");
  proxyList.pop()
  const randomProxyStr = proxyList[Math.floor(Math.random() * proxyList.length)];
  debugger;
  let foundProxy = false;

  // I looped here to make testing easy. The code inside the loop will work for your case as well.
  while (!foundProxy) {
    const randomProxy = proxyList[Math.floor(Math.random() * proxyList.length)];
    await findAvailableProxy(randomProxy)
      .then(() => {
        console.log(`Working proxy found!: ${randomProxy}`);
        foundProxy = true;
      })
      .catch((e) => {
        console.log(e)
      })
  }
}

run();
