const httpServer = require('http').createServer();
const io = require('socket.io')(httpServer, {
  cors: {
    origin: '*',
  },
});

const groups = {};
const userSockets = {};

// let existingText = ''

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('joinGroup', (join) => {
    const arr = join.split(':');
    const groupId = arr[0];
    const userId = arr[1];
    if (!groups[arr[0]]) {
      groups[groupId] = { users: [userId], text: '' };
    } else if (groups[groupId].users.indexOf(userId) == -1) {
      groups[groupId].users.push(userId);
    }
    socket.join(groupId);

    console.log(`User ${userId} joined group ${groupId}`);
    let text = groupId + ':' + groups[groupId].text;
    console.log(`User ${userId} first receive ${text}`)

    socket.userId = userId
    userSockets[userId] = socket

    socket.emit('text', text);
  });

  socket.on('text', (text) => {
    const arr = text.split(':');
    const groupId = arr[0];
    const newText = text.substr(groupId.length + 1);
    groups[groupId].text = newText;
    groups[groupId].users.forEach((memberId) => {
      console.log(groups)
      console.log(`receive ${newText}, send to ${memberId}`)
      // io.to(memberId).emit('text', text);
      const socket = userSockets[memberId];
      socket.emit('text', text);
    });
  });

  socket.on('disconnect', () => {
    console.log('a user disconnected');
    delete userSockets[socket.userId];
  });
});

httpServer.listen(3333, () => {
  console.log('listening on *:3333');
});
