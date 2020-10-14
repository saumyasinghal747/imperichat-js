export class Message {
    public sectionId:string;
    public author:User;
    public content: string;
    constructor(sectionId, author,content) {
        this.sectionId = sectionId;
        this.author = author;
        this.content = content
    }

}

export class User {
    public uid: string;
    public displayName: string;
    public email: string;
    constructor(uid,displayName,photoURL,email) {
        this.uid = uid;
        this.displayName = displayName;
        this.email = email;
    }

}

