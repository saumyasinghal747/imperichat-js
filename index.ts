//import {Message} from "./Message"; // this is not used?
import fetch from 'node-fetch';

const apiBase = 'https://mangoice.herokuapp.com/imperichat'
const EventSource = require('eventsource');
const EventEmitter = require('events');


class ImperichatAuthError extends Error {
    constructor(message) {
        super(message); // (1)
        this.name = "ImperichatAuthError"; // (2)
    }
}

export default class ImperichatClient extends EventEmitter {
    private token: string;

    subscribe(sectionId: string) {
        const source = new EventSource(`${apiBase}/l/messages/${sectionId}`);
        source.addEventListener("message", function (message) {
            const data = JSON.parse(message.data)
            this.emit('message', data)
        })
    }

    async login(botId: string, password: string) {
        const response = await fetch(`${apiBase}/bot/login`, {
            method: 'POST',
            body: JSON.stringify({botId, password}),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const content = await response.json()
        if (content.error) {
            // throw the error
            this.emit('error', new ImperichatAuthError("Either the password is incorrect, or the bot has not been registered."));
        } else {
            // the response is fine
            this.token = content.token // yay we are now logged in
            this.emit('ready');
        }
    }

    async logout(): Promise<void> {
        this.token = null
    }

    async sendMessage(sectionId: string, message: string): Promise<string> {

        if (!this.token) {
            this.emit('error', new ImperichatAuthError("The client is not logged in. Call ImperichatClient.login first."));
        }

        const response = await fetch(`${apiBase}/bot/message`, {
            method: 'POST',
            body: JSON.stringify({
                token: this.token,
                message, sectionId
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const content = await response.json();
        if (content.error) {
            this.emit('error', new ImperichatAuthError(content.error.message));
        } else {
            return content.messageId
        }
    }
}




