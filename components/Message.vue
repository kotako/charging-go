<template lang="html">
  <li class="media" v-if="message.user">
    <figure class="media-left">
      <p class="image is-64x64">
        <img :src="message.user.icon">
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <p>
          <strong>{{message.user.name}}</strong>
          <br>
          <span v-html="formattedPost" />
          <br>
          <span v-html="formattedDate" />
        </p>
      </div>
    </div>
  </li>
</template>

<script>
import h from 'htmlspecialchars'
import { link } from 'autolinker'

export default {
  props: {
    message: Object
  },
  computed: {
    formattedPost () {
      return link(h(this.message.body))
    },
    formattedDate () {
      const d = new Date(this.message.created_at)
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}`
    }
  }
}
</script>

<style lang="css">
</style>
