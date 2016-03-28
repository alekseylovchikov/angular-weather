var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

app.use(express.static('./'));

app.listen(port, function() {
  console.log('listen server on: http://localhost:' + port);
});
