"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Message = /** @class */ (function () {
    function Message(sectionId, author, content) {
        this.sectionId = sectionId;
        this.author = author;
        this.content = content;
    }
    return Message;
}());
exports.Message = Message;
var User = /** @class */ (function () {
    function User(uid, displayName, photoURL, email) {
        this.uid = uid;
        this.displayName = displayName;
        this.email = email;
    }
    return User;
}());
exports.User = User;
