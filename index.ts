import {Message} from "./Message";
import fetch  from 'node-fetch';
const apiBase = 'https://mangoice.herokuapp.com/imperichat'
const EventSource = require('eventsource');
const EventEmitter = require('events');
class ImperichatAuthError extends Error {
    constructor(message) {
        super(message); // (1)
        this.name = "ImperichatAuthError"; // (2)
    }
}

class ImperichatReferenceError extends Error {
    constructor(message) {
        super(message);
        this.name = "ImperichatReferenceError"
    }
}

export class ImperichatClient extends EventEmitter{
    private token: string;

    subscribe(sectionId:string){
        const source = new EventSource(`${apiBase}/l/messages/${sectionId}`);
        source.addEventListener("message",function (message) {
            const data = JSON.parse(message.data);
            this.emit('message',data)
        })
        return source.close
    }

    async fetchLast30(sectionId:string): Promise<Array<Message>|{error:{code:string,message:string}}>{
        const response = await (await fetch(`${apiBase}/messages/chunk/${sectionId}`,{
            method:'GET'
        })).json()
        if (response.error){
            this.emit('error', response.error.message)
        }
        return response
    }

    onMessage(sectionId:string, callback: (message:Message|{}, eventType:"added"|"modified"|"removed")=>()=>void ){
        const source = new EventSource(`${apiBase}/l/messages/${sectionId}`);
        source.addEventListener("message", function (message) {
            const data = JSON.parse(message.data)
            callback(data.message,data.event)
        })
        return source.close

    }

    async editMessage(sectionId:string, messageId:string, newMessage:string, token:string): Promise<void>{
        await fetch(`${apiBase}/messages/${sectionId}/${messageId}`,{
            method:'PATCH',
            body:JSON.stringify({
                message:newMessage,
                token // the token of the user, we fetch this
            })
        })
    }
    async deleteMessage(sectionId:string, messageId:string, token:string): Promise<void>{
        await fetch(`${apiBase}/messages/${sectionId}/${messageId}`,{
            method:'DELETE',
            body:JSON.stringify({
                token // the token of the user, we fetch this
            })
        })
    }

    async login(botId:string, password:string){
        const response = await fetch(`${apiBase}/bot/login`,{
            method:'POST',
            body:JSON.stringify({botId, password}),
            headers:{
                "Content-Type":"application/json"
            }
        })
        const content = await response.json()
        if (content.error){
            // throw the error
            throw new ImperichatAuthError("Either the password is incorrect, or the bot has not been registered.");
        }
        else {
            // the response is fine
            this.token= content.token; // yay we are now logged in
            this.emit('ready');
        }

    }

    async logout():Promise<void>{
        this.token = null
    }

    async sendMessage(sectionId:string, message:string):Promise<string> {

        if (!this.token){
             throw new ImperichatAuthError("The client is not logged in. Call ImperichatClient.login first.")
        }

        const response = await fetch(`${apiBase}/bot/message`,{
            method:'POST',
            body:JSON.stringify({
                token: this.token,
                message, sectionId
            }),
            headers:{
                "Content-Type":"application/json"
            }
        })

        const content = await response.json();
        if (content.error){
            this.emit('error',new ImperichatAuthError(content.error.message))
        }

        else {
            return content.messageId
        }


    }

}




