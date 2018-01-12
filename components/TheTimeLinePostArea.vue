<template lang="html">
  <form class="field is-grouped" @submit.prevent="doPost">
    <p class="control is-expanded">
      <input class="input" type="text" placeholder="What's happening?" v-model="body">
    </p>
    <p>
      <button class="button is-info" v-on:click="wanted = true">ほしい！</button>
      <button class="button is-success" v-on:click="wanted = false">あるよ！</button>
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
.button {
  margin: 0px 5px;
}
</style>
