var express = require('express');
var app = express();
var os = require('os');
var dns = require('dns');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  dns.lookup(request.headers.host, function onLookup(err, addresses, family) {
    response.render('pages/index', {
      "router": addresses,
      "internal": os.networkInterfaces()['eth1'][0]['address']
    });
  });

});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


