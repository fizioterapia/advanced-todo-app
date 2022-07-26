import io from 'socket.io-client';

export default function TodosSocket() {
    return (store) => {
       store.dispatch('setSocket', io('http://localhost:3000/', {
            reconnection: true,
            transports: ["websocket", "polling"]
        }));

        const socket = store.getters.getSocket

        socket.on('getSessions', (data) => {
            store.dispatch('updateSessions', data);
        })

        socket.on('getSession', (data) => {
            store.dispatch('updateSession', data);
        })

        socket.on('alert', (data) => {
            store.dispatch('addAlert', data);
        })
    }
}
