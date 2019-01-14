<template>
  <div class="container q-ma-lg">
    <div class="default flex">
        <div class="flex-center img" v-for="(img, index) in list" :key="index" @click="getCard(index)">
          <img :class="img.class" :src="img.path">
        </div>
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
      show: false
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
        console.log(random)
        this.listTotal.splice(random, 1)
      }
      temp = JSON.parse(JSON.stringify(this.list))
      for (i = 0; i < 6; i++) {
        random = Math.floor(Math.random() * temp.length)
        this.list.push(temp[random])
        console.log(random)
        temp.splice(random, 1)
      }
      /* console.log(this.listTotal)
      console.log(this.list)
      console.log(temp) */
    },
    getCard (index) {
      this.list[index].class = ''
      this.list[index].show = true
      if (this.show) {
        let result = this.wasFind(index)

        if (result.result) {
          this.list[result.firstCard].find = true
          this.list[result.secondCard].find = true
        } else {
          this.list[result.firstCard].show = false
          this.list[result.secondCard].show = false
          setTimeout(function () {
            this.list[result.firstCard].class = 'imgHide'
            this.list[result.secondCard].class = 'imgHide'
          }, 3000)
        }
      }
      this.show = !this.show
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
</style>
