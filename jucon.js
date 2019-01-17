//require
var robot = require("robotjs");
var connect = require('connect');
var serveStatic = require('serve-static');
const WebSocket = require('ws');
var os = require('os');
const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const port = new SerialPort("COM4", { baudRate: 256000 })
const parser = new Readline()
port.pipe(parser)

//package configs
robot.setKeyboardDelay(1);
const wss = new WebSocket.Server({ port: 1337 });


//html sever
connect().use(serveStatic(__dirname+"/html")).listen(8080, function(){
    console.log('HTML Server is running on http://' + getipv4() + ':8080');
});

//serial handler
parser.on('data', line => console.log(`> ${line}`))

//websocket handler 
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    if(message.startsWith("!")){
      console.log(message)
    }else{
      port.write(message)
    }
  });
});

//getipv4
function getipv4(){
  var ifaces = os.networkInterfaces();
  var addr = [];

  Object.keys(ifaces).forEach(function (ifname) {
    var alias = 0;
    ifaces[ifname].forEach(function (iface) {
      if ('IPv4' !== iface.family || iface.internal !== false) {
        // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
        return;
      }

      if (alias >= 1) {
        // this single interface has multiple ipv4 addresses
        addr.push(iface.address)
      } else {
        // this interface has only one ipv4 adress
        addr.push(iface.address)
      }
      ++alias;
    });
  });

  return addr[0];
}