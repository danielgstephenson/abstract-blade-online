"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIo = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const socket_io_1 = require("socket.io");
const config = {
    port: 3000,
    secure: false
};
const dirname = path_1.default.dirname(__filename);
const configPath = path_1.default.join(dirname, '../config.json');
const fileExists = fs_extra_1.default.existsSync(configPath);
if (fileExists) {
    const json = fs_extra_1.default.readJSONSync(configPath);
    if (typeof json.port === 'number')
        config.port = json.port;
    if (typeof json.secure === 'boolean')
        config.secure = json.secure;
}
console.log(config);
const app = (0, express_1.default)();
const staticPath = path_1.default.join(dirname, 'public');
const staticMiddleware = express_1.default.static(staticPath);
app.use(staticMiddleware);
const clientHtmlPath = path_1.default.join(dirname, 'public', 'client.html');
app.get('/', function (req, res) { res.sendFile(clientHtmlPath); });
const socketIoPath = path_1.default.join(dirname, 'node_modules', 'socket.io', 'client-dist');
app.get('/socketIo/:fileName', function (req, res) {
    const filePath = path_1.default.join(socketIoPath, req.params.fileName);
    res.sendFile(filePath);
});
function getServer() {
    if (config.secure) {
        const key = fs_extra_1.default.readFileSync('./sis-key.pem');
        const cert = fs_extra_1.default.readFileSync('./sis-cert.pem');
        const credentials = { key, cert };
        return new https_1.default.Server(credentials, app);
    }
    else {
        return new http_1.default.Server(app);
    }
}
function getIo(onListen) {
    const server = getServer();
    const io = new socket_io_1.Server(server);
    io.path(staticPath);
    server.listen(config.port, () => {
        console.log(`Listening on :${config.port}`);
        if (onListen != null)
            onListen();
    });
    return io;
}
exports.getIo = getIo;
//# sourceMappingURL=server.js.map