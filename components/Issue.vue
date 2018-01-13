<template lang="html">
  <li class="media" v-if="issue.user">
    <figure class="media-left">
      <a target="_blank" v-bind:href="twitterURL" class="image is-64x64">
        <img :src="issue.user.icon">
      </a>
    </figure>
    <div class="media-content">
      <div class="content">
        <p>
          <strong>{{issue.user.name}}</strong>
          <br>
          <span class="subtitle is-3" v-html="formattedPost" />
          <br>
          <strong v-text="issue.wanted ? 'ほしい！' : 'あるよ！'"/>
          <br>
          <span class="subtitle is-6" v-html="formattedDate" />
        </p>
      </div>
      <nav class="level is-mobile">
        <div class="level-left"></div>
        <div class="level-right">
          <i class="fa fa-comments" v-on:click="slideToggle" />
        </div>
      </nav>
      <transition name="slide-fade">
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
    },
    twitterURL () {
      return `https://twitter.com/intent/user?user_id=${this.issue.user.twitter}`
    }
  }
}
</script>

<style lang="css">
span strong {
  margin: 100px 0px;
}
.fa {
  font-size: 30px;
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s ease;
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
</style>
