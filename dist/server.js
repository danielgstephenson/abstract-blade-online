"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIo = void 0;
var express = require("express");
var http = require("http");
var https = require("https");
var fs = require("fs-extra");
var path = require("path");
var socket_io_1 = require("socket.io");
var config = {
    port: 3000,
    secure: false
};
var dirname = path.dirname(__filename);
var configPath = path.join(dirname, '../config.json');
var fileExists = fs.existsSync(configPath);
if (fileExists) {
    var json = fs.readJSONSync(configPath);
    if (typeof json.port === 'number')
        config.port = json.port;
    if (typeof json.secure === 'boolean')
        config.secure = json.secure;
}
console.log(config);
var app = express();
var staticPath = path.join(dirname, 'public');
var staticMiddleware = express.static(staticPath);
app.use(staticMiddleware);
var clientHtmlPath = path.join(dirname, 'public', 'client.html');
app.get('/', function (req, res) { res.sendFile(clientHtmlPath); });
var socketIoPath = path.join(dirname, 'node_modules', 'socket.io', 'client-dist');
app.get('/socketIo/:fileName', function (req, res) {
    var filePath = path.join(socketIoPath, req.params.fileName);
    res.sendFile(filePath);
});
function getServer() {
    if (config.secure) {
        var key = fs.readFileSync('./sis-key.pem');
        var cert = fs.readFileSync('./sis-cert.pem');
        var credentials = { key: key, cert: cert };
        return new https.Server(credentials, app);
    }
    else {
        return new http.Server(app);
    }
}
function getIo(onListen) {
    var server = getServer();
    var io = new socket_io_1.Server(server);
    io.path(staticPath);
    server.listen(config.port, function () {
        console.log("Listening on :".concat(config.port));
        if (onListen != null)
            onListen();
    });
    return io;
}
exports.getIo = getIo;
//# sourceMappingURL=server.js.map