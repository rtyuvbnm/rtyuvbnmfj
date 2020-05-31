'use strict'
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  console.log(req.url);
  const now = new Date();
  console.info('[' + now + '] Requested by ' + req.connection.remoteAddress);

  switch(req.method){
    case 'GET':{
      switch(req.url){
        case '/':{
          res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8'
          });
          const rs = fs.createReadStream('./form.html');
          rs.pipe(res);
          break;
        }
        case '/css/style.css':{
          res.writeHead(200, {
            'Content-Type': 'text/css'
          });
          const rs = fs.createReadStream('./css/style.css');
          rs.pipe(res);
          break;
        }
        case '/scripts/style.js':{
          res.writeHead(200, {
            'Content-Type': 'text/javascript'
          });
          const rs = fs.createReadStream('./scripts/style.js');
          rs.pipe(res);
          break;
        }
        case '/images/eye1.png':{
          res.writeHead(200, {
            'Content-Type': 'image/png'
          });
          const rs = fs.createReadStream('./images/eye1.png');
          rs.pipe(res);
          break;
        }
        case '/images/eye2.png':{
          res.writeHead(200, {
            'Content-Type': 'image/png'
          });
          const rs = fs.createReadStream('./images/eye2.png');
          rs.pipe(res);
          break;
        }
        case '/images/eye3.png':{
          res.writeHead(200, {
            'Content-Type': 'image/png'
          });
          const rs = fs.createReadStream('./images/eye3.png');
          rs.pipe(res);
          break;
        }
        case '/images/eye4.png':{
          res.writeHead(200, {
            'Content-Type': 'image/png'
          });
          const rs = fs.createReadStream('./images/eye4.png');
          rs.pipe(res);
          break;
        }
        default:{
          break;
        }
      }
      break;
    }
    default:{
      break;
    }
  }



}).on('error', (e) => {
  console.error('[' + new Date() + '] Server Error', e);
}).on('clientError', (e) => {
  console.error('[' + new Date() + '] Client Error', e);
});

const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.info('[' + new Date() + '] Listening on ' + port);
});