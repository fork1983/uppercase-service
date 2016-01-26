var http = require('http');

http.createServer(function(request, response){
    if(request.method == 'POST'){
	if(request.url == '/upper/string'){
	    var string;
	    request.on('data', function(data){
		string = JSON.parse(data.toString()).data.toUpperCase();
	    });
	    request.on('end', function(){
		response.writeHead(200, {'Content-Type': 'text/plain'});
		response.end('{"result\": "' + string + '\"}');
	    });
	}else if(request.url == '/upper/array'){
	    var result = {"result":[]};
	    request.on('data', function(data){
		var tmp = JSON.parse(data.toString());
		for(var i = 0; i < tmp["data"].length; i++){
		    result["result"][i] = tmp["data"][i].toUpperCase();
		}
	    });
	    request.on('end', function(){
		response.writeHead(200, {'Content-Type': 'text/plain'});
		var jsonResult = JSON.stringify(result);
		response.end(jsonResult);
	    });
	}
    }
}).listen(8080);

console.log('Server running at http://0.0.0.0:8080/');
