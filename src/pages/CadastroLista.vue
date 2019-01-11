<template>
  <q-page class="q-ma-lg">
    <div class="container">
      <div class="row">
        <h3 class="col-4 offset-4 justify-center text-blue"> Cadastro de Jogos </h3>
      </div>
      <div class="row q-mt-lg">
        <div class="col-1 offset-11">
          <q-btn push label="Novo" color="cyan" size="md" @click="redirective(0)"></q-btn>
        </div>
      </div>
      <div class="row gutter-sm q-mt-lg">
        <div class="col-2 displayFlex divGame" v-for="(item, index) in list" :key="index">
          <div class="displayFlex divBtn btnFake" @click="redirective(item.id)">
            <q-icon name="videogame_asset" color="deep-purple-10" size="4em"></q-icon>
            <label class="text-deep-purple-10"> {{item.name}} </label>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'PageCadastro',
  data () {
    return {
      list: []
    }
  },
  mounted () {
    this.list = this.listGame
  },
  methods: {
    redirective (idRote) {
      let pathRote = '/cadastro_jogo'
      let rote = {path: `${pathRote}/${idRote}`}
      this.$router.push(rote)
    }
  },
  computed: {
    ...mapState('modulesStore', ['listGame'])
  }
}
</script>

<style>
  label{
    font-size: 1.5em;
  }
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
  .divBtn{
    width: auto;
  }
  @media only screen and (max-width: 1482px) {
    h3 {
      width: 100% !important;
      margin-left: 0 !important;
      text-align: center;
    }
  }
  @media only screen and (max-width: 1348px) {
    .divGame {
      width: calc(100% /3) !important;
    }
  }
  @media only screen and (max-width: 1158px) {
    button{
      float: right;
    }
    h3{
      font-size: 2.5em;
    }
  }
   @media only screen and (max-width: 535px) {
    .divGame {
      width: calc(100% /2) !important;
      margin-top: 2em;
    }
    h3{
      font-size: 2em;
    }
  }
  @media only screen and (max-width: 500px) {
    .divGame {
      width: 100% !important;
    }
    i{
      font-size: 2em;
    }
    label {
      font-size: 1.5em;
    }
  }
</style>
