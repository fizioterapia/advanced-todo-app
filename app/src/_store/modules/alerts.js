const todos = {
    state: {
        alerts: []
    },
    mutations: {
        addAlert(state, alert) {
            state.alerts.push(alert);
        },
        removeAlert(state, alertId) {
            state.alerts.splice(alertId, 1);
        }
    },
    actions: {
        addAlert({commit}, alert) {
            commit('addAlert', alert);
        },
        removeAlert({commit}, alertId) {
            commit('removeAlert', alertId);
        }
    },
    getters: {
        getAlerts(state) {
            return state.alerts
        }
    }
}

export default todos;