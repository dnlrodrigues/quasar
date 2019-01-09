<template>
  <q-page class="q-ma-lg">
    <div class="container">
      <div class="row q-mt-xl">
        <div class="col-10 offset-1 tableForm" v-if="register.length == null">
          <q-field label="Id:" label-width="2">{{register.id}}</q-field>
          <q-field label="Nome do Jogo:" label-width="2">
            <q-input v-model="register.name"/>
          </q-field>
          <q-field label="Descrição:" label-width="2">
            <q-input v-model="register.description"></q-input>
          </q-field>
          <q-field label="Path:" label-width="2">
            <q-input v-model="register.path"></q-input>
          </q-field>
        </div>
        <div class="col-12 q-mt-xl transformFlex">
          <q-btn class="btns marginRight" icon="delete" label="Excluir" color="negative" @click="del"></q-btn>
          <q-btn class="btns" label="Voltar" color="warning" @click="back"></q-btn>
          <q-btn class="btns" icon="save" label="Salvar" color="primary" @click="save"></q-btn>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>

import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'PageCadastroJogo',
  data () {
    return {
      register: {}
    }
  },
  mounted () {
    if (this.$route.params.id) {
      let game = this.GET_GAME(this.$route.params.id)
      if (game) {
        this.register = game
      }
    }
  },
  methods: {
    ...mapMutations('modulesStore', ['SET_INC_LIST', 'SET_SAVE', 'SET_DELETE']),
    back (event) {
      /* this.$router.push() //adiciona a rota
        this.$router.replace() // troca pela rota
        this.$router.go() // vai para
        this.$router.forward() */ // vai para frente no registro (similar a seta no navegador)
      this.$router.back() // vai para tras no registro (similar a seta do navegador)
    },
    del (event) {
      if (this.register.id) {
        console.log('Deletei!')
        this.SET_DELETE(this.register.id)
        this.$router.back()
      }
    },
    save (event) {
      if (this.register.id !== undefined) {
        this.SET_SAVE(this.register)
      } else {
        this.register.id = this.GET_ID_LAST + 1
        this.SET_INC_LIST(this.register)
      }
      this.$router.back()
    }
  },
  computed: {
    ...mapGetters('modulesStore', ['GET_GAME', 'GET_ID_LAST'])
  }
}
</script>

<style scoped>
 .btns{
   margin: 0 2%;
   float: right;
 }
 .marginRight{
   margin-right: 8%;
 }
 @media only screen and (max-width: 1192px) {
   .tableForm {
     width: 100%;
   }
 }
 @media only screen and (max-width: 433px) {
   button{
     width: 100%;
     margin: 2% 0 !important;
   }
   .transformFlex{
     display: flex;
     flex-direction: column-reverse
   }
 }
</style>
