var express = require('express');
var app = express();
var os = require('os');
var dns = require('dns');
var url = require('url');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  var databaseHost = url.parse(process.env.DATABASE_URL).hostname;
  var internal = "";
  if (os.networkInterfaces()['eth1'] !== undefined) {
    internal = os.networkInterfaces()['eth1'][0]['address']
  }
  dns.lookup(request.headers.host, function onLookup(err, addresses, family) {
    response.render('pages/index', {
      "host": request.headers.host,
      "router": addresses,
      "internal": internal,
      "database": databaseHost
    });
  });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


