<template>
  <q-page class="q-ma-lg">
    <div class="container">
       <component :is="component"></component>
    </div>
  </q-page>
</template>

<script>
import jogoVelha from '../components/JogoVelha.vue'
import jogoMemoria from '../components/jogoMemoria.vue'
import cacaPalavra from '../components/cacaPalavra.vue'

export default {
  name: 'PageJogo',
  components: {
    jogoVelha,
    jogoMemoria,
    cacaPalavra
  },
  data () {
    return {
      component: ''
    }
  },
  mounted () {
    this.component = this.$route.params.name
  }
}
</script>

<style>
</style>
