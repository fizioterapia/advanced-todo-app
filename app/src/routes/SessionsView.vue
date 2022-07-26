<template>
  <div class="home">
    <input v-model="sessionName" placeholder="sessionName" @keyup.enter="create" />
    <ul>
      <li v-for="(session, index) in getSessions" :key="index">
        <router-link :to="'/session/' + session"> {{ session }} </router-link>
      </li>
    </ul>
    <code>
      {{ getSessions }}
    </code>
  </div>
</template>

<script>
// @ is an alias to /src

import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'SessionsView',
  data() {
    return {
      sessionName: ""
    }
  },
  computed: {
    ...mapGetters(['getSessions'])
  },
  methods: {
    ...mapActions(["retrieveSessions", "createSession"]),
    create() {
      this.createSession(this.sessionName);
      this.sessionName = "";
    }
  },
  mounted() {
    this.retrieveSessions();
  }
}
</script>
