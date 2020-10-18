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

// Or, if using ES modules
import ImperichatClient from 'imperichat-js'
```

Then, initialize the client. The following is some starter code for a simple bot that responds with "World!" when someone says "Hello".

```javascript
const client = new ImperichatClient()

client.login("myBotId", "supersecretpassword")

// Fires when the bot successfully logs in
client.once('ready', () => {
    // Subscribe sets an event listener in that particular channel
    // which emits a message event when a message is sent
    client.subscribe('channelID')
})

// Triggers upon receiving the message event
client.on('message', message => { 
    let channelid = message.sectionId;
    if (message.content === "Hello"){
        client.sendMessage(channelid, "World!").then(messageId => {
            console.log(`Message sent with ID ${messageId}`)
      })
    }
 })

// Triggers when the client throws an error
client.on('error', error => console.error(error))
```

To change bots within code:

```javascript 1.8
client.logout();

client.login("myNewBotId", "supersecretotherpassword")
```
