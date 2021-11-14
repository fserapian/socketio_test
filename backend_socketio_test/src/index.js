const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

let userExists = false;
let counter = 0;
let interval = 0;
let n = 1;
const emitCall = () => {
  const calls = [`call-${n}`, `call-${++n}`];

  for (const call of calls.reverse()) {
    const msg = {
      ID: call.replace('-', '__'),
      duration: parseInt(call.substr(5)),
    };

    io.emit('call', msg);
    console.log('Send', msg);
  }

  interval = (2 ** counter) * 1000;
  counter++;
  setTimeout(emitCall, interval);
};

io.on('connection', (socket) => {
  if (!userExists) {
    emitCall();
    userExists = true;
  }

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
