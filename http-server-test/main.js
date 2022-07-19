const http = require('http');
const fs = require('fs');
const url = require('url');

http
  .createServer(function (req, res) {
    const pathname = url.parse(req.url).pathname;

    console.log(`request for ${pathname} received`);

    if (pathname === '/') {
      pathname = 'index.html';
    }

    fs.readFile(pathname.substr(1), function (err, data) {
      if (err) {
        console.log(err);
        res.writeHead(404, { 'Content-Type': 'text/html' });
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });

        res.write(data.toString());
      }

      res.end();
    });
  })
  .listen(8081);

console.log('server 8081 start');
