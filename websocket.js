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

    //keep track of all connections
    let connections = [];

    wss.on('connection', (ws) => {
        const connection = { id: uuid.v4(), alive: true, ws: ws };
        connections.push(connection);

        // Forward messages to everyone except the sender
        ws.on('message', function message(data) {
            connections.forEach((c) => {
                if (c.id !== connection.id) {
                    c.ws.send(data);
                }
            });
        });
        
        //remove the closed connection so we don't try to forward anymore
        ws.on('close', () => {
            connections.findIndex((o, i) => {
                if (o.id === connection.id) {
                    connections.splice(i, 1);
                    return true;
                }
            });
        });

        //respond to pong messages by marking the connection alive
        ws.on('pong', () => {
            connection.alive = true;
        });
    });

    //keep active connections alive
    setInterval(() => {
        connections.forEach((c) => {
            //kill any connection that didn't respond to the ping laast time
            if (!c.alive) {
                c.ws.terminate();
            } else {
                c.alive = false;
                c.ws.ping();
            }
        });
    }, 10000);
}

module.exports = { websocket };