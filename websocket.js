const { WebSocketServer } = require('ws');
const uuid = require('uuid');

function websocket(httpServer) {
    //make websocket object
    const wss = new WebSocketServer({ noServer: true });

    //handle the protocol upgrade from HTTP to WebSocket
    httpServer.on('upgrade', (request, socket, head) => {
        wss.handleUpgrade(request, socket, head, function done(ws) {
            wss.emit('connection', ws, request);
        });
    });

}