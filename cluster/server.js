const http = require('http');
const pid = process.pid;

http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(`I am node server ${pid}`);
}).listen(3000,()=>{
    console.log('server running')
});
