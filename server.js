var http = require('http');
var url = require('url');
var  fs = require('fs');


http.createServer(function(req, res){
console.log(req.url);
    switch (true) {

        case req.url == '/':
           sendFile('index.html', res);
            break;
        case /\/song.+/.test(req.url):
            sendFile('song.json', res);
            //console.log(res);de
            break;

      default:
        sendFile('.'+req.url,res);
    }


}).listen(8081);
console.log("gdfgdfg");


function sendFile(fileName, res){
    var fileStream = fs.createReadStream(fileName); // readFile("_����", function(err, data){}
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

