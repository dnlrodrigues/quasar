<template>
  <q-page class="q-ma-lg">
    <div class="container">
      <div class="row q-mt-xl">
        <div class="col-10 offset-1" v-if="register.length == null">
          <q-field label="Id:" label-width="2">{{register.id}}</q-field>
          <q-field label="Nome do Jogo:" label-width="2">
            <q-input v-model="register.name"/>
          </q-field>
          <q-field label="Descrição:" label-width="2">
            <q-input v-model="register.description"></q-input>
          </q-field>
        </div>
        <div class="col-12 q-mt-xl">
          <q-btn class="btns marginRight" icon="delete" label="Excluir" color="negative" @click="del"></q-btn>
          <q-btn class="btns" label="Voltar" color="warning" @click="back"></q-btn>
          <q-btn class="btns" icon="save" label="Salvar" color="primary" @click="save"></q-btn>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  name: 'PageCadastroJogo',
  data () {
    return {
      register: {}
    }
  },
  mounted () {
    console.log('Aqui primeiro')
    // this.getData()
    if (this.$route.params.id) {
      console.log(this.GET_GAME)
      // console.log(this.$store.state.modulesStore.listGame)
      // console.log(this.$store)
    }
  },
  methods: {
    back (event) {
      /* this.$router.push()
        this.$router.replace()
        this.$router.go()
        this.$router.forward() */
      this.$router.back()
    },
    del (event) {
      console.log('Deletei!')
    },
    save (event) {
      console.log('Salvei!')
    },
    getData () {
      return () => {
        console.log({msg: 'Passou aqui', obj: this.$store})
        if (this.$route.params.id) {
          /* console.log(this.register)
          console.log(this.GET_GAME()) */
          /* this.register = this.$getters.getterGame() */
          /* return mapGetters('moduleStore', ['getterGame'])  *//* this.$store.getters.getterGame */
          // return this.$store.getters.getters.getterGame
        }
      }
    }
  },
  computed: {
    ...mapGetters('modulesStore', ['GET_GAME'])
  }
}
</script>

<style>
 .btns{
   margin: 0 2%;
   float: right;
 }
 .marginRight{
   margin-right: 8%;
 }
</style>
