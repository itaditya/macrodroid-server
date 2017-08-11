var express = require("express");
var http = require('http');
var app = express();

app.use(express.static(__dirname + '/public'));

var port = 8080;
var clipContent = "";

var io = require('socket.io').listen(app.listen(port));
console.log(`Listening on port ${port}`);
io.sockets.on('connection', (socket) => {
    socket.emit('message', { message: 'server connected' });
});
app.get("/", (req, res) => {
    res.send("server running");
});
app.get("/insta", (req, res) => {
    res.send(`<a style="display:none;" href='${req.query.url}media/?size=l' download>Link</a><script>document.querySelector('a').click();</script>`);
});
app.get("/clip/save", (req, res) => {
    clipContent = req.query.clip;
    console.log(clipContent);
    io.sockets.emit('content', {content:clipContent});
});
app.get("/clip", (req, res) => {
    res.sendfile('./public/clip.html');
    // res.send(`<h1>${clipContent}</h1><textarea style=""></textarea><button onclick='txt = document.querySelector("textarea");txt.value = ${clipContent};txt.select();document.execCommand("copy");'>Copy</button><script></script>`);
});
