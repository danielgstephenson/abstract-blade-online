"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const updateInterval = 1 / 60;
const io = (0, server_1.getIo)(() => {
    setInterval(update, updateInterval * 1000);
});
io.on('connection', socket => {
    console.log('connection:', socket.id);
    socket.emit('connected');
});
function update() {
    //
}
//# sourceMappingURL=index.js.map