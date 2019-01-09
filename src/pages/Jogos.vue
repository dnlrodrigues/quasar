<template>
  <q-page class="q-ma-lg">
    <div class="container">
      <div class="row">
        <div class="displayRow">
          <div class="col-2 displayFlex divGame q-ml-lg q-mr-lg" v-for="(item, index) in list" :key="index">
            <div class="displayFlex divBtn btnFake q-mt-lg" @click="redirective(item.id)">
              <q-icon name="videogame_asset" color="deep-purple-10" size="4em"></q-icon>
              <label class="text-deep-purple-10"> {{item.name}} </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'PageJogos',
  data () {
    return {
      list: []
    }
  },
  mounted () {
    this.list = this.listGame
  },
  computed: {
    ...mapState('modulesStore', ['listGame'])
  }
}
</script>

<style>
  .displayFlex{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .btnFake, .btnFake label{
    cursor: pointer;
  }
  .btnFake:hover{
    opacity: 0.8;
  }
  .displayRow{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
</style>
