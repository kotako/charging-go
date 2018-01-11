<template lang="html">
  <li class="media" v-if="issue.user">
    <figure class="media-left">
      <p class="image is-64x64">
        <img :src="issue.user.icon">
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <p>
          <strong>{{issue.user.name}}</strong>
          <br>
          <span v-html="formattedPost" />
          <br>
          <span v-html="formattedDate" />
        </p>
      </div>
      <nav class="level is-mobile">
        <div class="level-left"></div>
        <div class="level-right">
          <i class="fa fa-eye" v-on:click="slideToggle" />
        </div>
      </nav>
      <transition>
        <div class="message-list " v-if="open">
          <TheMessageTimeLine :issue="issue"/>
          <TheMessagePostArea :issue="issue"/>
        </div>
      </transition>
    </div>
  </li>
</template>

<script>
import h from 'htmlspecialchars'
import { link } from 'autolinker'
import TheMessageTimeLine from '~/components/TheMessageTimeLine.vue'
import TheMessagePostArea from '~/components/TheMessagePostArea.vue'

export default {
  data () {
    return {
      open: false
    }
  },
  props: {
    issue: Object
  },
  components: {
    TheMessageTimeLine,
    TheMessagePostArea
  },
  methods: {
    slideToggle () {
      this.open = !this.open
    }
  },
  computed: {
    formattedPost () {
      return link(h(this.issue.body))
    },
    formattedDate () {
      const d = new Date(this.issue.created_at)
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}`
    }
  }
}
</script>

<style lang="css">
</style>
