<template>
  <q-page class="q-ma-lg">
    <div class="container">
      <div class="row">
        <h3 class="col-4 offset-4 justify-center text-blue"> Cadastro de Jogo </h3>
      </div>
      <div class="row gutter-sm q-mt-lg">
        <div class="col-2 displayFlex" @click="redirective('/cadastro_jogo', 0)">
           <q-icon name="videogame_asset" color="deep-purple-10" size="4em"></q-icon>
           <label class="text-deep-purple-10"> Teste Jogo </label>
         <!--  <q-field icon="videogame_asset" icon-color="dark" dark label="Teste jogo"></q-field> -->
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageCadastro',
  methods: {
    redirective (pathRote, idRote) {
      let rote = {path: `${pathRote}/${idRote}`}
      this.$router.push(rote)
    }
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
</style>
