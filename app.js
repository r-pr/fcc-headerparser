var express = require("express"),
    fs = require("fs"),
    app = express(),
    port = 8080;
    
app.get('/', function(req, res){
  var result = {};

  var lang = req.headers['accept-language'].match(/^([^,]+)[,;]/)[1];
  var os = req.headers['user-agent'].match(/(\(.+?\))/)[1];
  
  result.ip_address = req.headers['x-forwarded-for'];
  result.language = lang;
  result.operating_system = os;
  
  res.json(result);
});

app.use(function(req, res){
  res.status(404).send('404 - Not Found');
});

app.use(function(err, req, res, next){
  fs.appendFileSync('log.txt', '\n'+Date()+'\n'+err.stack+'\n');
  res.status(500).send('500 - Server Error');
});

app.listen(port, function(){
  console.log('Express started at port '+port);
});