<template lang="html">
  <form class="field is-grouped" @submit.prevent="doPost">
    <p class="control is-expanded">
      <input class="input" type="text" placeholder="What's happening?" v-model="body">
    </p>
    <p>
      <button class="button is-primary" v-on:click="wanted = true">貸して！</button>
      <button class="button is-primary" v-on:click="wanted = false">貸すよ！</button>
    </p>
  </form>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      wanted: true,
      body: ''
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    async doPost () {
      if (this.body === '') return
      await this.$store.dispatch('ADD_ISSUE', {userId: this.user.uid, body: this.body, wanted: this.wanted})
      this.body = ''
    }
  }
}
</script>

<style scoped>
.field {
  margin-bottom: 16px;
}
.active {
  background-color: #3498db;
}
</style>
