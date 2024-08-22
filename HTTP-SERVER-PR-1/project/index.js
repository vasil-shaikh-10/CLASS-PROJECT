const http = require('http');
const fs = require('fs');
const server = http.createServer((req, res) => {


res.writeHead(200, { 'content-type': 'text/html' });
if (req.url == '/') {
    fs.readFileSync('index.html', (data) => {
        res.end(data);
    })
    res.end('CODE IS RUNNING');
}
else if (req.url == '/login') {
    res.end('Login Page');
}
else if (req.url == '/signup') {
    res.end('signup Page');
}
else if (req.url == '/service') {
    res.end('Service Page');
}
else if (req.url == '/contact') {
    res.end('Contact Page');
}
});

server.listen(8090, () => {
    console.log('Server running at http://localhost:8090/');
});