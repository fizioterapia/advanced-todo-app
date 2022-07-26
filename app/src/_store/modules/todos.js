const todos = {
    state: {
        socket: null,
        sessions: {},
        currentSession: {}
    },
    mutations: {
        setSocket(state, socket) {
            state.socket = socket;
        },
        updateSessions(state, sessions) {
            state.sessions = sessions;
        },
        updateSession(state, session) {
            state.currentSession = session
        }
    },
    actions: {
        setSocket({commit}, socket) {
          commit('setSocket', socket);
        },
        updateSessions({commit}, sessions) {
            commit('updateSessions', sessions);
        },
        createSession({state}, sessionName) {
            state.socket.emit('createSession', sessionName);
        },
        retrieveSessions({state}) {
            console.log(state);
            state.socket.emit('getSessions');
        },
        retrieveSession({state}, sessionName) {
            state.socket.emit('getSession', sessionName)
        },
        updateSession({commit}, session) {
            commit('updateSession', session);
        },
        addItem({state}, item) {
            state.socket.emit('addItem', item);
        },
        modifyPriority({state}, item) {
            state.socket.emit('modifyPriority', item);
        },
        finishItem({state}, item) {
            state.socket.emit('finishItem', item);
        }
    },
    getters: {
        getSessions(state) {
            return state.sessions;
        },
        getSession(state) {
            return state.currentSession
        },
        getSocket(state) {
            return state.socket
        }
    }
}

export default todos;