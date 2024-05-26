"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = require("./server");
var updateInterval = 1 / 60;
var io = (0, server_1.getIo)(function () {
    setInterval(update, updateInterval * 1000);
});
io.on('connection', function (socket) {
    console.log('connection:', socket.id);
});
function update() {
    //
}
//# sourceMappingURL=index.js.map