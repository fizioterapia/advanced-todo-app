<template>
  <div class="container">
    <h1>Create new session</h1>
    <input v-model="sessionName" placeholder="Session Name" @keyup.enter="create" />
    <ul class="sessions">
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
    ...mapActions(['retrieveSession', 'retrieveSessions', 'createSession']),
    create() {
      this.createSession(this.sessionName);
      this.$router.push('/session/' + this.sessionName);
    }
  },
  mounted() {
    this.retrieveSessions();
    this.retrieveSession(null);
  }
}
</script>
