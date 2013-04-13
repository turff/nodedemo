var server = require("./server");
var router = require("./router");
var requestHandler = require("./requestHandlers");

var handle = {
  "/": requestHandler.start,
  "/start": requestHandler.start,
  "/upload": requestHandler.upload
};

server.start(router.route, handle);