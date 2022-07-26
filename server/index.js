const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const sessions = {}

const makeSessions = (sessions) => {
    const data = [];

    for (const s in sessions) {
        data.push(s);
    }
    return data;
}

const sortSession = (sessionId) => {
    const session = sessions[sessionId]

    session.todos = session.todos.sort((a, b) => {
        return (b.finished ? -1 : b.priority - a.priority)
    })

    sessions[sessionId] = session;

    io.of('/').sockets.forEach((socket) => {
        if (socket.data.session === sessionId) {
            socket.emit('getSession', sessions[sessionId]);
        }
    })
}

const removeEmptySession = (socket) => {
    const session = socket.data?.session;

    if(!session || !sessions[session]) {
        return;
    }

    let delSession = true;

    io.of('/').sockets.forEach((s) => {
        if (s.data.session === session && s !== socket) {
            delSession = false;
        }
    })

    if (delSession) {
        delete sessions[session];
    }

    io.emit('alert', {
        error: true,
        data: "Session " + session + " has expired"
    })
    io.emit('getSessions', makeSessions(sessions));
}

io.on('connection', (socket) => {
    socket.on('disconnect', function() {
        removeEmptySession(socket);
    })

    socket.on('getSessions', () => {
        socket.emit('getSessions', makeSessions(sessions));
    })

    socket.on('getSession', (data) => {
        removeEmptySession(socket);

        socket.emit('getSession', sessions[data] || {});
        socket.data.session = data;
    })

    socket.on('addItem', (data) => {
        if(!sessions[data.sessionId]) {
            return;
        }

        sessions[data.sessionId].todos.push(
            {
                name: data.itemName,
                priority: 0,
                finished: false
            })

        socket.emit('alert', {
            error: false,
            data: "Added item - " + data.itemName
        })

        sortSession(data.sessionId)
        socket.emit('getSession', sessions[data.sessionId]);
    })

    socket.on('modifyPriority', (data) => {
        if(!sessions[data.sessionId]) {
            return;
        }

        const session = sessions[data.sessionId]
        const item = session.todos[data.itemId]

        if(!item) {
            return;
        }

        item.priority = parseInt(item.priority) + data.value;

        socket.emit('alert', {
            error: false,
            data: "Updated item - " + session.todos[data.itemId].name
        })

        sortSession(data.sessionId)
        socket.emit('getSession', sessions[data.sessionId]);
    })

    socket.on('finishItem', (data) => {
        if(!sessions[data.sessionId]) {
            return;
        }

        const session = sessions[data.sessionId]
        const item = session.todos[data.itemId]

        if(!item) {
            return;
        }

        item.finished = true;

        socket.emit('alert', {
            error: false,
            data: "Finished item - " + session.todos[data.itemId].name
        })

        sortSession(data.sessionId)
        socket.emit('getSession', sessions[data.sessionId]);
    })

    socket.on('createSession', (data) => {
        if (sessions[data]) {
            socket.emit('alert', {
                error: true,
                data: "This session already exists."
            })

            return;
        }

        sessions[data] = {
            todos: []
        }

        socket.emit('alert', {
            error: false,
            data: "Created session: " + data
        })

        sortSession(data)

        io.emit('getSessions', makeSessions(sessions));
    })
});

server.listen(3000, () => {
    console.log('server listening on port 3000');
})