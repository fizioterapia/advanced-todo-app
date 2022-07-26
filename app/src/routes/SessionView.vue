<template>
  <div>
    <h1>{{ sessionId }}</h1> <br />
    <input v-model="itemName" placeholder="Item Name" @keyup.enter="pushItem"/> <br />
    <ul v-if="getSession">
      <li v-for="(todoItem, index) in getSession.todos" :key="index" :class="{finished: todoItem.finished}">
        {{ todoItem.name }}
        <button @click="modPriority(index, 1)">Increase Priority</button>
        <button @click="modPriority(index, -1)">Decrease Priority</button>
        <button @click="finish(index)">Finish</button>
      </li>
    </ul>
    <code>
      {{ getSession }}
    </code>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from "vuex";

  export default {
    data() {
      return {
        itemName: ""
      }
    },
    computed: {
      ...mapGetters(['getSession', 'getSessions']),
      sessionId() {
        return this.$route.params.sessionId
      }
    },
    methods: {
      ...mapActions(['retrieveSession', 'addItem', 'modifyPriority', 'finishItem']),
      modPriority(itemId, value) {
        this.modifyPriority({
          sessionId: this.sessionId,
          itemId: itemId,
          value: value
        })
      },
      pushItem() {
        this.addItem({
          sessionId: this.sessionId,
          itemName: this.itemName
        })

        this.itemName = "";
      },
      finish(itemId) {
        this.finishItem({
          sessionId: this.sessionId,
          itemId: itemId
        })
      }
    },
    mounted() {
      this.retrieveSession(this.sessionId);
    }
  }
</script>

<style>
  .finished {
    text-decoration: line-through;
    color: gray;
  }

  .finished button {
    display: none;
  }
</style>