const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server);

const connectedUsers = {}; // Store connected users and their sockets

io.on('connection', (socket) => {
  const userId = socket.handshake.query.userId; // Extract userId from query params
  connectedUsers[userId] = socket.id; // Map userId to socket.id

  console.log(`User connected: ${userId}`);

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${userId}`);
    delete connectedUsers[userId]; // Remove disconnected user
  });

  // Listen for the transfer event
  socket.on('transferOption', ({ recipientId, option }) => {
    const recipientSocketId = connectedUsers[recipientId]; // Get recipient socket id
    if (recipientSocketId) {
      // Send the option to the recipient
      io.to(recipientSocketId).emit('receiveOption', { option });
    } else {
      console.log('Recipient not connected');
    }
  });
});

server.listen(4000, () => {
  console.log('Server listening on port 4000');
});
