function httpGetAsync(theUrl, callback) { //theURL or a path to file
  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
      var data = httpRequest.responseText;  //if you fetch a file you can JSON.parse(httpRequest.responseText)
      if (callback) {
        callback(data);
      }
    }
  };

  httpRequest.open('GET', theUrl, true);
  httpRequest.send(null);
}


function httpPostAsync(theUrl, payload, callback) { //theURL or a path to file
  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
      var data = httpRequest.responseText;  //if you fetch a file you can JSON.parse(httpRequest.responseText)
      if (callback) {
        callback(data);
      }
    }
  };

  httpRequest.open('POST', theUrl, true);
  httpRequest.setRequestHeader('Content-Type', 'application/json');
  httpRequest.send(JSON.stringify({payload: payload}));
}
