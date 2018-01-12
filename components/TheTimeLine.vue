<template lang="html">
  <div class="timeline">
    <TheTimeLinePostArea v-if="user" />
    <div>
      <button class="button" v-on:click="wanted = true">貸して</button>
      <button class="button" v-on:click="wanted = false">貸すよ</button>
    </div>
    <ul class="posts">
      <transition-group name="post">
        <Issue class="post" :issue="issue" :key="issue['.key']" v-for="issue in issues" v-if="issue.user&&issue.wanted==wanted" />
      </transition-group>
    </ul>
  </div>
</template>

<script>
import Issue from '~/components/Issue.vue'
import { mapGetters } from 'vuex'
import TheTimeLinePostArea from '~/components/TheTimeLinePostArea.vue'

export default {
  data () {
    return {
      wanted: true
    }
  },
  components: {
    Issue,
    TheTimeLinePostArea
  },
  computed: {
    ...mapGetters(['user', 'issues'])
  }
}
</script>

<style scoped>
.timeline {
  height: calc(100vh - 76px);
}

.timeline .posts{
  height: calc(100% - 36px);
  overflow-y: auto;
}

.post-enter-active {
  animation: slideIn 0.3s linear;
}

@keyframes slideIn {
  0% {opacity: 0.0}
  100% {opacity: 1.0}
}
</style>
