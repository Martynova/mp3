var http = require('http');
var url = require('url');
var  fs = require('fs');


http.createServer(function(req, res){
//console.log(req.url);
    switch (req.url) {

        case '/':
           sendFile('index.html', res);
            break;
        case '/song':
            sendFile('song.json', res);
            //console.log(res);





    }

}).listen(8080);
console.log("gdfgdfg");


function sendFile(fileName, res){
    var fileStream = fs.createReadStream(fileName); // readFile("_путь", function(err, data){}
    fileStream
        .on('error', function(){
            res.statusCode = 500;
            res.end("Server error");
        })
        .pipe(res)
        .on('close', function(){
            fileStream.destroy();
            console.log("Finish");
        });
    //console.log(fileStream);
}

