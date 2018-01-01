"use strict";
var config = require('./config');
var path = require('path');
var logger = require('morgan');
var http = require('http');


var Datastore = require('nedb');
var db = new Datastore({filename : 'users'});
db.loadDatabase();


var server = http.createServer().listen(config.get('port'),config.get('ip'), function(){
  console.log('Express server listening on port=' + config.get('port')+",  ip="+config.get('ip'));
});



var io = require('socket.io')(server);
io.sockets.on('connection', function (client) {

const valueFind=()=>db.find({str:{ $exists: true }}, function (err, value) {//
	 client.emit('whu',value);
});//db

valueFind();

//console.log(value2);


client.broadcast.emit('whuN');
client.on("whuS",function () {

valueFind();

});

client.on("addB",function (data) {
if(data.str.length&&data.http.length<1010){
//console.log(data);
db.insert(data);
valueFind();
client.broadcast.emit('whuN');
}//if

});

client.on("delB",function (data) {
db.remove({_id:data}, {});
valueFind();
client.broadcast.emit('whuN');
});

client.on("delAll",function () {
db.remove({}, {multi: true});
valueFind();
client.broadcast.emit('whuN');
});

});