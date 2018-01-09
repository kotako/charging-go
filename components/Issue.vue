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
        </p>
      </div>
      <nav class="level is-mobile">
        <div class="level-left"></div>
        <div class="level-right">
          <a class="level-item">
            <a target="_blank" :href="`/posts/${issue['.key']}`" class="icon is-small"><i class="fa fa-eye"></i></a>
          </a>
        </div>
      </nav>
      <TheMessageTimeLine :issue="issue"/>
      <TheMessagePostArea :issue="issue"/>
    </div>
  </li>
</template>

<script>
import h from 'htmlspecialchars'
import { link } from 'autolinker'
import TheMessageTimeLine from '~/components/TheMessageTimeLine.vue'
import TheMessagePostArea from '~/components/TheMessagePostArea.vue'

export default {
  props: {
    issue: Object
  },
  components: {
    TheMessageTimeLine,
    TheMessagePostArea
  },
  computed: {
    formattedPost () {
      return link(h(this.issue.body))
    }
  }
}
</script>

<style lang="css">
</style>
