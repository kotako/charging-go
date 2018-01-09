<template lang="html">
  <form class="field is-grouped" @submit.prevent="doPost">
    <p class="control is-expanded">
      <input class="input" type="text" placeholder="Comment" v-model="body">
    </p>
    <p class="control">
      <button class="button is-primary">
        issue
      </button>
    </p>
  </form>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      body: ''
    }
  },
  props: {
    issue: Object
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    async doPost () {
      await this.$store.dispatch('ADD_MESSAGE', {userId: this.user.uid, body: this.body, issueId: this.issue['.key']})
      this.body = ''
    }
  }
}
</script>

<style scoped>
.field {
  margin-bottom: 16px;
}
</style>
