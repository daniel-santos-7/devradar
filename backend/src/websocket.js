const socketio = require('socket.io');
const calculateDistance = require('./calculateDistance');
const connections = [];
let io;

function setupWebsocket(server) {

    io = socketio(server);
    io.on('connection', (socket)=> {
        const {latitude, longitude, techs} = socket.handshake.query;

        connections.push({ 
            id: socket.id,
            coodinates: {
                latitude: Number(latitude),
                longitude: Number(longitude)
            },
            tehcs: techs.split(',').map(tech=> tech.trim())
        });

    });

}

function findConnections(coordinates, techs) {
    return connections.filter((connection)=> (
        calculateDistance(coordinates, connection.coodinates)) < 10
        &&
        connections.some((item)=> techs.include(techs))
    );
}

function sendMessage(to, message, data) {
    to.forEach(connection => {
        io.to(connection.id).emit(message, data);
    });
}

module.exports = {setupWebsocket, findConnections, sendMessage};