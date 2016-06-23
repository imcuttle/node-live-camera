/**
 * Created by Yc on 2016/6/23.
 */
var http = require('http');
var path = require('path');
var fs = require('fs');


http.createServer((req, res) => {
    fs.readFile(path.join(__dirname,(req.url==='/'?'index.html':req.url)),
        function (err,data) {
            if(err){
                res.writeHead(500);
                return res.end('Error loaded');
            }
            res.writeHead(200);
            res.end(data);
        }
    );
}).listen(3502);

var WebSocketServer = require('ws').Server
    , wss = new WebSocketServer({ port: 3503 });
wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
        client.send(data);
    });
};
wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        // console.log('received: %s', message);
        // ws.broadcast()
        wss.clients.forEach((x)=>{
            if(x===ws) return;
            x.send(message);
        });
    });

    // ws.send('something');
});