// server.js
// where your node app starts

// init project
var express = require('express');

var mongoose=require('mongoose');
var shortUrl=require('./model/shorturl.js');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.
mongoose.connect(process.env.dburl);
// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
//./new logic
app.get('/new/:url(*)',(req,res)=>{
var {url}=req.params;
 // var pattern =/(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
  var pattern=/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
  if(pattern.test(url))
  {
  var short=Math.floor(Math.random()*100000).toString();
    var data=new shortUrl({OriginalUrl:url,ShortUrl:short});
    data.save(err=>{
    if(err) res.send('cannot connect to database');
    });
    res.json(data);
  }
  else res.end('error invalid url');
});
//shorturl execution logic
app.get('/:surl',(req,res)=>{
var surl=req.params.surl;
  if(surl=='') res.send('fh')
  shortUrl.findOne({ShortUrl:surl},(err,data)=>{
  if(err) res.send('error reading data');
    else if(data!=null){
        var str=data.OriginalUrl;
        var re=new RegExp("^(http|https)://","i");
      if(re.test(str)){ res.redirect(301,str);}
      else {res.redirect(301,'http://'+str);}
    }
  })
  res.send('cannot find shorturl in database');
})
// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
