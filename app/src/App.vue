<template>
  <div class="alerts">
    <div v-for="(alert, index) in getAlerts" :key="index" class="alert" :class="{error: alert.error, success: !alert.error}">
      {{ alert.data }}
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

<style lang="scss" src="@/_style/_main.scss" />
