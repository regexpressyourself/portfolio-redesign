var http = require("http");
var resume = require("resume-schema").resumeJson;
var theme = require("./index.js");

var port = 8081;
http.createServer(function(req, res) {
	res.writeHead(200, {"Content-Type": "text/html"});
	res.end(render(true));
}).listen(port);

console.log("Serving theme");
console.log("Preview: http://localhost:8081/");

function render() {
	try {
		return theme.render(true);
	} catch(e) {
		console.log("Error: " + e.message);
		return "";
	}
}
