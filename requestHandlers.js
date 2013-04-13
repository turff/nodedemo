var querystring = require("querystring"),
  fs = require("fs"),
  formidable = require("formidable");

function writeContent(response,type,textOut) {
  response.writeHead(200, {"Content-Type" : type});
  response.write(textOut);
  response.end();
}

function start(response, postData) {
  console.log("Request handler 'start' was called.");

  writeContent(response,'text/html', '<html>' +
    '<head>' +
    '<meta http-equiv="Content-Type" content="text/html;' +
    'charset=UTF-8" />' +
    '</head>' +
    '<body>' +
    '<form action="/upload" enctype="multipart/form-data" method="post">' +
    '<input type="file" name="upload"/>' +
    '<input type="submit" value="Upload file" />' +
    '</form>' +
    '</body>' +
    '</html>');
}

function upload(response, request) {
  console.log("Request handler 'upload' was called.");

  var form = new formidable.IncomingForm();
  console.log("about to parse");
  form.parse(request, function(error, fields, files) {
    console.log("parsing done");

    /* Possible error on poor little windoze systems:
       tried to rename to an already existing file */
    fs.rename(files.upload.path, "/tmp/test.png", function(err) {
      if (err) {
        fs.unlink("/tmp/test.png");
        fs.rename(files.upload.path, "/tmp/test.png");
      }
    });
    writeContent(response, 'text/html', "received image:<br/><img src='/show' />");
  });
}

function show(response) {
  console.log("Request handler 'show' was called.");
  fs.readFile("/tmp/test.png", "binary", function(error,file) {
    if (error) {
      response.writeHead(500, {"Content-Type" : "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {"Content-Type" : "image/png"});
      response.write(file, "binary");
      response.end();
    }
  });
}

exports.start = start;
exports.upload = upload;
exports.show = show;