var exec = require("child_process").exec;

function writeContent(response,type,textOut) {
  response.writeHead(200, {"Content-Type":"text/" + type});
  response.write(textOut);
  response.end();
}

function start(response) {
  console.log("Request handler 'start' was called.");

  writeContent(response,'html', '<html>' +
    '<head>' +
    '<meta http-equiv="Content-Type" content="text/html;' +
    'charset=UTF-8" />' +
    '</head>' +
    '<body>' +
    '<form action="/upload" method="post">' +
    '<textarea name="text" rows="20" cols="60"></textarea>' +
    '<input type="submit" value="Submit text" />' +
    '</form>' +
    '</body>' +
    '</html>');
}

function upload(response) {
  console.log("Request handler 'upload' was called.");
  writeContent(response, 'plain', "Hello, upload");
}

exports.start = start;
exports.upload = upload;
