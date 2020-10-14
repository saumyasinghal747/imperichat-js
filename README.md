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

client.onMessage('1234sectionid',function (message) { 
    console.log(message.author.displayName, " sent ", message.content)
 })
```
