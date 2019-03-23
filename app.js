const express = require('express')
const app = express();
const server = require('http').createServer(app);
const socket = require('socket.io')(server);

server.listen(3000); 

app.use(express.static(__dirname + '/public'));

const raspberryPiCamera = require('raspberry-pi-camera-native');


raspberryPiCamera.on('frame', (data) => {
    console.log('update');
    //socket.emit('image', "data:image/png;base64,"+ data.toString("base64"));  
    socket.emit('image', { image: true, data: data.toString('base64') });
});

raspberryPiCamera.start({
    width: 640,
    height: 360,
    fps: 2,
    quality: 60,
    encoding: 'JPEG'
  });

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
}); 


