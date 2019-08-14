# Single Proxy Finder

**This currently only works with HTTPS proxies.**

There are many tools to find a whole list of proxies and export them to a
file.  This tool takes a list of proxies and finds one that works, and returns
it to you.  

The reason for this is when accessing a site frequently, the state of the proxy
can change rapidly.  E.g. the site you're trying to scrape can ban you.  BUT, it's a pain to have to check an entire list of proxies or deal with the error if you're looping through an array.

## Getting Started

Go to a site like https://us-proxy.org and grab a list of proxies.  The list must be in the format `hostname:port`.  E.g. `12.12.12.12:8080`

### Example

The only parameter for the function is `pathToProxyList`.  It must be a txt file.

`const proxy = require("./singleProxyChecker");

async function test() {
    var testValue = await proxy.findProxyFromList('proxyList.txt');
    console.log('Returned ' + testValue);
}

test()`

## Built With

* [axios](https://github.com/axios/axios)
