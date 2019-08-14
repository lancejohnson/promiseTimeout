const axios = require("axios");
const fs = require("fs");
const url = require("url");

function testRandomProxy(randomProxy) {
  return new Promise((resolve, reject) => { //Quest: 1) why doesn't this return an unresolved promise?  2) What happens to the rest of the program while it's waiting for the promise to resolve?  Does it pause until the promise has resolved?
    const proxyUrl = url.parse('http://' + randomProxy);
    req = axios({
        url: "https://www.landwatch.com",
        method: "GET",
        proxy: {
          host: proxyUrl.hostname,
          port: proxyUrl.port
        },
        timeout: 1000, // Bad proxys will cause your request to hang
      })
      .then((response) => { //As long as there's a response we can resolve the promise.
        resolve(randomProxy)
      })
      .catch((err) => { //Unworking proxies throw errors.  Whatever the error is, we want to reject that proxy.
        reject("Failed")
      })
  })
}
async function findProxyFromList(pathToProxyList) { //Quest: I have a `Utilities` folder right now where I keep a list of proxies.  I figure I'll be referring to that for a LOT of different scrapers.  Should I turn it into a self-sufficient package instead and just import it so it runs soup-to-nuts?
  const proxyList = fs.readFileSync(pathToProxyList).toString().split("\n");
  proxyList.pop()
  let foundProxy = false;

  // I looped here to make testing easy. The code inside the loop will work for your case as well.
  while (!foundProxy) { //Quest: look up how while loops work.  Namely, when is it checking the condition?  It seems like it'll check each time it loops, and the value will only change when the promise from findAvailableProxy resolves.
    const randomIndex = Math.floor(Math.random() * proxyList.length)
    const randomProxy = proxyList[randomIndex];
    await testRandomProxy(randomProxy)
      .then(() => {
        foundProxy = true;
        console.log(randomProxy + ' works!')
      })
      .catch((e) => {
        console.log('Womp, womp: ' + randomProxy);
        proxyList.splice(randomIndex, 1);
      })
    if (foundProxy) {
        fs.writeFileSync(pathToProxyList, proxyList.join('\n')); //Quest: should I explain more why I'm doing this `proxyList.join('\n')`?  It's so I can write one proxy per line, which is the format it needs to be read in.
        return randomProxy //Quest: is there a better place to put this return statement?  I want to only return the value randomProxy if it's a working one, which is when foundProxy = true.
    }
  }
}

module.exports = {
    findProxyFromList,
}
