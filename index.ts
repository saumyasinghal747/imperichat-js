import {Message} from "./Message";

export class ImperichatClient {
    constructor() {
    }

    static onMessage(sectionId, callback: (message:Message)=>void ){
        const source = new EventSource(`https://mangoice.herokuapp.com/imperichat/l/messages/${sectionId}`);
        source.addEventListener("message", function (message) {
            const data = JSON.parse(message.data)
            callback(data)
        })

    }

}


