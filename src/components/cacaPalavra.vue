<template>
  <div class="container q-ma-lg">
    <div class="default" v-touch-pan="handler">
      <label class="default text-justify" v-for="(line, index) in list" :key="index"> {{line}} </label>
    </div>
    <q-btn class="q-ma-lg" label="Click" style="background: goldenrod; color: white" @click="getText"></q-btn>
  </div>
</template>

<script>
export default {
  name: 'ComponentCacaPalavra',
  data () {
    return {
      words: '',
      alphabet: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
      biggerSize: 0,
      size: 4,
      list: []
    }
  },
  mounted () {
    this.getText()
    this.createMixer()
    this.randomListWords()
  },
  methods: {
    getText () {
      var randomWords = require('random-words')
      this.words = randomWords({exactly: 10, formatter: (word) => word.toUpperCase()})
      console.log(this.words)
      for (let i = 1; i < this.words.length; i++) {
        this.biggerSize = this.biggerSize > this.words[i].length ? this.biggerSize : this.words[i].length
      }
      this.size = this.size + this.biggerSize
    },
    createMixer () {
      let randomPosition, randomLetters, phrase, skip
      for (let i = 0; i < 10; i++) {
        randomPosition = this.randomPositionWord(this.words[i])
        randomLetters = this.randomLettersList(this.size - this.words[i].length)
        phrase = (randomPosition === 0 ? '' : randomLetters.substring(0, randomPosition)) + this.words[i] + randomLetters.substring(randomPosition)
        this.list.push(phrase)
        skip = this.generateRandom(2)
        if (skip === 1) {
          skip = this.generateRandom(3)
          for (let i = 0; i < skip; i++) {
            this.list.push(this.randomLettersList(this.size))
          }
        }
      }
      console.log(this.list)
    },
    randomListWords () {
      let word, random1, random2
      for (let i = 0; i < 5; i++) {
        random1 = this.generateRandom(10)
        random2 = this.generateRandom(10)
        word = this.words[random1]
        this.words[random1] = this.words[random2]
        this.words[random2] = word
      }
      console.log(this.words)
    },
    handler (obj) {
      console.log(obj)
    }
  },
  computed: {
    randomPositionWord (word) {
      return (word) => this.generateRandom(this.size - word.length)
    },
    randomLettersList (size) {
      return (size) => {
        let letters = ''
        for (let i = 0; i < size; i++) {
          letters = letters + this.alphabet[this.generateRandom(this.alphabet.length)]
        }
        return letters
      }
    },
    generateRandom (number) {
      return (number) => Math.floor(Math.random() * number)
    }
    // npm install random-words npm install --save random-words
  }
}
</script>

<style>
.default {
  float: left;
  width: 100%;
}
.text-justify{
  
}
</style>
