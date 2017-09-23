//I really don't know what this does but it doesn't seem to effect anything


var http = require('http');

// Options to be used by request 
var options = {
   host: 'localhost',
   port: '8888',
   path: '/index.html'  
};

// Callback function is used to deal with response
var callback = function(response){
   // Continuously update stream with data
   var body = '';
   response.on('data', function(data) {
      body += data;
   });
   
   response.on('end', function() {
      // Data received completely.
      console.log(body);
   });
}
// Make a request to the server
var req = http.request(options, callback);
req.end();