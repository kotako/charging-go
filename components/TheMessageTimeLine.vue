<template>
  <div class="timeline">
    <ul>
      <Message :message="message" :key="message['.key']" v-for="message in messages(issue['.key'])" v-if="message.user" />
    </ul>
  </div>
</template>

<script>
import Message from '~/components/message.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    Message
  },
  props: {
    issue: Object
  },
  computed: {
    ...mapGetters(['messages'])
  }
}
</script>
