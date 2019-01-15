<template>
  <div class="container q-ma-lg">
    <div class="default flex">
        <div class="flex-center img" :disabled="disabled" v-for="(img, index) in list" :key="index" @click="getCard(index)">
          <img :class="img.class" :src="img.path">
        </div>
        <q-btn class="q-mt-lg" label="Reiniciar" color="secondary" @click="reload" v-show="disabled"></q-btn>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'ComponentJogoMemoria',
  data () {
    return {
      listTotal: [],
      list: [],
      show: false,
      disabled: false
    }
  },
  mounted () {
    this.listTotal = JSON.parse(JSON.stringify(this.imagesCute))
    this.createListRandom()
  },
  methods: {
    createListRandom () {
      let random, temp
      for (var i = 0; i < 6; i++) {
        random = Math.floor(Math.random() * this.listTotal.length)
        this.list.push(this.listTotal[random])
        this.listTotal.splice(random, 1)
      }
      temp = JSON.parse(JSON.stringify(this.list))
      for (i = 0; i < 6; i++) {
        random = Math.floor(Math.random() * temp.length)
        this.list.push(temp[random])
        temp.splice(random, 1)
      }
    },
    getCard (index) {
      if (this.disabled) {
        return
      }
      this.list[index].class = ''
      this.list[index].show = true
      if (this.show) {
        var result = this.wasFind(index)

        if (result.result) {
          this.list[result.firstCard].find = true
          this.list[result.secondCard].find = true
        } else {
          this.list[result.firstCard].show = false
          this.list[result.secondCard].show = false
          var vue = this
          setTimeout(function () {
            vue.addClass(result.firstCard, result.secondCard)
          }, 1000)
        }
      }
      this.show = !this.show
      if (this.verifyFinished()) {
        this.disabled = true
        alert('Você venceu!')
      }
    },
    addClass (firstCard, secondCard) {
      this.list[firstCard].class = 'imgHide'
      this.list[secondCard].class = 'imgHide'
    },
    verifyFinished () {
      let finished = true
      for (var i = 0; i < this.list.length; i++) {
        if (!this.list[i].find) {
          finished = false
        }
      }
      return finished
    },
    reload () {
      window.location.reload()
    }
  },
  computed: {
    ...mapState('modulesStore', ['imagesCute']),
    wasFind (index) {
      return (index) => {
        let card
        for (var i = 0; i < this.list.length; i++) {
          if (!this.list[i].find) {
            if (this.list[i].show && card === undefined) {
              card = i
            }
            if (this.list[i].show && i !== card) {
              return {result: this.list[i].name === this.list[card].name, firstCard: card, secondCard: i}
            }
          }
        }
      }
    }
  }
}
</script>

<style scoped>
  .default{
    float: left;
    width: 100%;
  }
  .flex{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .flex-center{
    align-items: center;
  }
  .img{
    border: 0.1em solid black;
    width: 25%;
    height: 25%;
  }
  img{
    width: 100%;
    height: 16em;
  }
  .imgHide{
    opacity: 0;
  }
  @media screen and (min-width: 3190px) {
    .default {
      width: 50%;
      margin-left: 25%;
    }
  }
  @media screen and (min-width: 2180px) and (max-width: 3189px) {
    .default {
      width: 75%;
      margin-left: 12.5%;
    }
  }
  @media screen and (max-width: 1100px) {
    .img {
      width: 50%;
    }
  }
  @media screen and (max-width: 500px) {
    .img {
      width: 100%;
    }
  }
</style>
