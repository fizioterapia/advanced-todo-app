import { createStore } from 'vuex'
import TodosSocket from "@/_store/modules/plugins/todossocket";

import todos from './modules/todos';
import alerts from './modules/alerts';

const TodosPlugin = TodosSocket();

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    todos,
    alerts
  },
  plugins: [TodosPlugin]
})
