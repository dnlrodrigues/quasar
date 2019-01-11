<template>
  <div class="container q-ma-lg">

  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'ComponentJogoMemoria',
  data () {
    return {
      listTotal: [],
      list: []
    }
  },
  mounted () {
    this.listTotal = this.imagesCute
  },
  computed: {
    ...mapState('modulesStore', ['imagesCute']),
    createListRandom () {
      return () => {}
    }
  }
}
</script>

<style>
</style>
