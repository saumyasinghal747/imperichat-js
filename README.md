# Imperichat JS

Library for writing Imperichat Bots in JS!

## Installation
```shell script
npm i imperichat-js
```

## Getting Started

You're going to need Node.js running in a trusted environment to use this library.

First, require the module like so:

```javascript 1.8
const ImperichatClient = require('imperichat-js')
```

Then, initialize the client:

```javascript 1.8
const client = new ImperichatClient()

client.login("myBotId","supersecretpassword")

client.onMessage('1234sectionid',function (message) { 
    if (message.content==="Hello"){
        client.sendMessage('1234sectionid',"World!")
    }
 })
```
To change bots within code:
```javascript 1.8
client.logout();

client.login("myNewBotId", "supersecretotherpassword")
```
