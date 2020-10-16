import {Message} from "./Message";
import fetch  from 'node-fetch';
const apiBase = 'https://mangoice.herokuapp.com/imperichat'

class ImperichatAuthError extends Error {
    constructor(message) {
        super(message); // (1)
        this.name = "ImperichatAuthError"; // (2)
    }
}

export class ImperichatClient {
    private token: string;
    constructor() {
    }

    onMessage(sectionId:string, callback: (message:Message)=>void ){
        const source = new EventSource(`${apiBase}/l/messages/${sectionId}`);
        source.addEventListener("message", function (message) {
            const data = JSON.parse(message.data)
            callback(data)
        })

    }

    async login(botId:string, password:string){
        const response = await fetch(`${apiBase}/bot/login`,{
            method:'POST',
            body:JSON.stringify({botId, password})
        })
        const content = await response.json()
        if (content.error){
            // throw the error
            throw new ImperichatAuthError("Either the password is incorrect, or the bot has not been registered.");
        }
        else {
            // the response is fine
            this.token= content.token // yay we are now logged in
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
            })
        })

        const content = await response.json();
        if (content.error){
            throw new ImperichatAuthError(content.error.message)
        }

        else {
            return content.messageId
        }


    }

}




