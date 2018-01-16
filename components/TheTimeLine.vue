<template lang="html">
  <div class="timeline">
    <TheTimeLinePostArea v-if="user" />
    <div class="tabs is-toggle" v-if="user">
      <ul>
        <li v-on:click="wanted = true" :class="{ 'is-active': wanted }"><a>ほしい</a></li>
        <li v-on:click="wanted = false" :class="{ 'is-active': !wanted }"><a>あるよ</a></li>
      </ul>
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
