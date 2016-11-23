/* Listens to port 10002, just like a http server */
/*var http = require("http");
http.createServer(function (request, response) {
 // Send the HTTP header
 // HTTP Status: 200 : OK
 // Content Type: text/plain
 response.writeHead(200, {'Content-Type': 'text/plain'});

 // Send the response body as "Hello World"
 response.end('Hello World\n');
}).listen(10002);
// Console will print the message
console.log('Server running at http://127.0.0.1:10002/');
*/

/*Synchronous file read*/
/*var fs = require("fs");
var data = fs.readFileSync('input.txt');
console.log(data.toString());
console.log("\n");
console.log("\n");
console.log("Program Ended");
console.log("\n");*/

/*Asynchronous file read*/
/*var fs = require("fs");
fs.readFile('input.txt', function (err, data) {
 if (err) return console.error(err);
 console.log(data.toString());
});
console.log("\n\nProgram Ended\n\n");*/


/* Event example */
// Import events module
/*var events = require('events');
// Create an eventEmitter object
var eventEmitter = new events.EventEmitter();
// Create an event handler as follows
var connectHandler = function connected() {
 console.log('connection successful.');

 // Fire the data_received event
 eventEmitter.emit('data_received');
}
// Bind the connection event with the handler
eventEmitter.on('connection', connectHandler);
// Bind the data_received event with the anonymous function
eventEmitter.on('data_received', function(){
 console.log('data received successfully.');
});
// Fire the connection event
eventEmitter.emit('connection');
console.log("Program Ended.");*/

/* Events explained*/
/*var events = require('events');
var eventEmitter = new events.EventEmitter();
// listener #1
var listner1 = function listner1() {
 console.log('listner1 executed.');
}
// listener #2
var listner2 = function listner2() {
 console.log('listner2 executed.');
}
// Bind the connection event with the listner1 function
eventEmitter.addListener('connection', listner1);
// Bind the connection event with the listner2 function
eventEmitter.on('connection', listner2);
var eventListeners =
require('events').EventEmitter.listenerCount(eventEmitter,'connection');
console.log(eventListeners + " Listner(s) listening to connection event");
// Fire the connection event
eventEmitter.emit('connection');
// Remove the binding of listner1 function
eventEmitter.removeListener('connection', listner1);
console.log("Listner1 will not listen now.");
// Fire the connection event
eventEmitter.emit('connection');
eventListeners =
require('events').EventEmitter.listenerCount(eventEmitter,'connection');
console.log(eventListeners + " Listner(s) listening to connection event");
console.log("Program Ended.");*/

/* express example */
/*var express = require('express');
var Item = require('models').Item;
var app = express();
var itemRoute = express.Router();
 
itemRoute.param('itemId', function(req, res, next, id) {
  Item.findById(req.params.itemId, function(err, item) {
    req.item = item;
    next();
  });
});
 
// Create new Items
itemRoute.post('/', function(req, res, next) {
  var item = new Item(req.body);
  item.save(function(err, item) {
    res.json(item);
  });
});
 
itemRoute.route('/:itemId')
  // Get Item by Id
  .get(function(req, res, next) {
    res.json(req.item);
  })
  // Update an Item with a given Id
  .put(function(req, res, next) {
    req.item.set(req.body);
    req.item.save(function(err, item) {
      res.json(item);
    });
  })
  // Delete and Item by Id
  .delete(function(req, res, next) {
    req.item.remove(function(err) {
      res.json({});
    });
  });
 
app.use('/api/items', itemRoute);
app.listen(8080);*/

/* Loopback example */
console.log('Going to Listen on port 10002');
var loopback = require('loopback');
var app = module.exports = loopback();
 
var Item = loopback.createModel(
  'Item',
  {
    description: 'string',
    completed: 'boolean'
  }
);
console.log('Listening on port 10002');
app.model(Item);
app.use('/api', loopback.rest());
var explorer = require('loopback-component-explorer');
app.use('/explorer', explorer.routes(app, { basePath: '/api' }));

app.listen(10002);
/*Works like a charm http://localhost:10002/explorer/ */
