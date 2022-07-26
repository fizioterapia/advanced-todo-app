<template>
  <nav>
    <router-link to="/">Home</router-link>
  </nav>
  <div class="alerts">
    <div v-for="(alert, index) in getAlerts" :key="index" class="alert" :class="{error: alert.error, success: !alert.error}">
      {{ alert.data }} <br />
      <button @click.prevent="rAlert(index)">Remove Alert</button>
    </div>
  </div>
  <router-view/>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";

  export default {
    computed: {
      ...mapGetters(['getAlerts'])
    },
    methods: {
      ...mapActions(['removeAlert']),
      rAlert(alertId) {
        this.removeAlert(alertId)
      }
    }
  }
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.alerts {
  display: flex;
  flex-direction: column;

  position: absolute;
  width: 20%;

  top: 0;
  right: 0.25rem;
}

.alert {
  margin: 0.25rem 0;
  padding: 0.5rem 1rem;
}

.success {
  background: lime;
}

.error {
  background: red;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
