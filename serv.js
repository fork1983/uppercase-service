var http = require('http');

http.createServer(function(request, response){
    var dataUpper = {};
    if(request.method==='POST'){
	if(request.url=='/upper/string'){
	    request.on('data', function(data){
		var tmp = JSON.parse(data.toString());
		dataUpper = tmp.data.toUpperCase();
	    });
	    request.on('end', function(){
		response.writeHead(200, {'Content-Type': 'text/plain'});
		response.end('{\n"result\": "' + dataUpper + '\"\n}\n');
	    });
	}else if(request.url=='/upper/array'){
	    request.on('data', function(arr){
		var a = Array(arr.toString());
		var myObject = eval('(' + a + ')');
		console.log(myObject[0]);
//		console.log(a);
//		var tmp = JSON.parse(a.data);
//		for(var i=0;i<tmp.length;i++){
//		    console.log(tmp[i]);
//		}
	    });
	    request.on('end', function(){
		response.writeHead(200, {'Content-Type': 'text/plain'});
		response.end('medved\n');
	    });
	}
    }
}).listen(8080);

console.log('Server running at http://127.0.0.1:8080/');
