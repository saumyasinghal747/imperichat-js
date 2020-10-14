"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ImperichatClient = /** @class */ (function () {
    function ImperichatClient() {
    }
    ImperichatClient.prototype.onMessage = function (sectionId, callback) {
        var source = new EventSource("https://mangoice.herokuapp.com/imperichat/l/messages/" + sectionId);
        source.addEventListener("message", function (message) {
            var data = JSON.parse(message.data);
            callback(data);
        });
    };
    return ImperichatClient;
}());
exports.default = { ImperichatClient: ImperichatClient };
