import {createServer } from 'http';

// const server = createServer(function(){}) 
const server = createServer((req, res)=> {
  if(req.url==="/" && req.method==="GET"){
    res.end("Hello World!")
  }
  else{
    res.statusCode = 404;
    res.end();
  }
});

server.listen(3300)
