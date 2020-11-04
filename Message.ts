export class Message {
    public sectionId:string;
    public author:User;
    public content: string;
    public time: Date;
    public id: string;
    constructor(sectionId:string, author:User,content:string, time:Date, id:string) {
        this.sectionId = sectionId;
        this.author = author;
        this.content = content;
        this.time = time;
        this.id = id
    }

}

export class User {
    public uid: string;
    public displayName: string;
    public email: string;
    public photoURL: string;
    public bot: boolean;
    public id:string;
    constructor(uid:string,displayName:string,photoURL:string,email:string,bot:boolean=false) {
        this.uid = uid;
        this.displayName = displayName;
        this.email = email;
        this.photoURL = photoURL;
        this.bot = bot || false;
        this.id = uid
    }

}

