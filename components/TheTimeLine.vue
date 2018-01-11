<template lang="html">
  <div class="timeline">
    <TheTimeLinePostArea v-if="user" />
    <ul class="posts">
      <transition-group name="post">
        <Issue class="post" :issue="issue" :key="issue['.key']" v-for="issue in issues" v-if="issue.user" />
      </transition-group>
    </ul>
  </div>
</template>

<script>
import Issue from '~/components/Issue.vue'
import { mapGetters } from 'vuex'
import TheTimeLinePostArea from '~/components/TheTimeLinePostArea.vue'

export default {
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
