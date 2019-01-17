<template>
  <div class="container q-ma-lg">
    <div class="default flex padding" v-touch-pan.horizontal="handler" v-if="$q.platform.is.desktop">
      <div class="default" v-for="(line, index) in list" :key="index" :disabled="disabled">
        <label class="space" :class="classAdd(`${line}_${indexLetter}`)" v-for="(letter, indexLetter) in line" :key="indexLetter" :id="`${line}_${indexLetter}`"> {{letter}} </label>
      </div>
    </div>
    <div class="default flex padding" v-touch-pan.noMouse.horizontal="handler" v-if="$q.platform.is.mobile">
      <div class="default" v-for="(line, index) in list" :key="index" :disabled="disabled">
        <label class="space" :class="classAdd(`${line}_${indexLetter}`)" v-for="(letter, indexLetter) in line" :key="indexLetter" :id="`${line}_${indexLetter}`"> {{letter}} </label>
      </div>
    </div>
    <div class="default q-ma-lg">
      <label class="labelWords q-ma-lg" v-for="(item) in words" :key="item" :class="classLineThrough(item)"> {{item}} </label>
    </div>
    <q-btn class="q-ma-lg" label="Reload" style="background: goldenrod; color: white" @click="reload()" v-show="disabled"></q-btn>
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
      list: [],
      disabled: false,
      last_id: [],
      find: '',
      classLetter: [],
      classWords: []
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
    },
    handler (obj) {
      let object = obj.evt.path.find(item => item.tagName === 'LABEL')
      if (!object || this.disabled) {
        return
      }
      let id = object.id
      if (!this.last_id.includes(id)) {
        this.find = this.find + object.innerText.trim()
        this.last_id.push(id)
      }
      if (obj.isFinal) {
        if (!this.words.includes(this.find)) {
          /* let arrayId = this.last_id.slice(0)
          for (let i = 0; i < arrayId.length; i++) {
            if (!this.classLetter.includes(arrayId[i])) {
              this.last_id.splice(i, 1)
            }
          } */
          this.last_id = []
        } else {
          for (let i = 0; i < this.list.length; i++) {
            if (this.list[i].includes(this.find)) {
              let position = this.list[i].indexOf(this.find)
              for (let j = 0; j < this.find.length; j++) {
                this.classLetter.push(`${this.list[i]}_${position}`)
                position++
              }
            }
          }
          this.classWords.push(this.find)
        }
        this.find = ''
      }
    },
    reload () {
      window.location.reload()
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
    },
    classAdd (id) {
      return (id) => {
        if (this.classLetter.includes(id)) {
          return {backYellow: true}
        } else {
          return {backYellow: false}
        }
      }
    },
    classLineThrough (id) {
      return (id) => {
        if (this.classWords.includes(id)) {
          return {lineThrough: true}
        } else {
          return {lineThrough: false}
        }
      }
    }
  },
  watch: {
    classWords: function (newClass, oldClass) {
      if (this.classWords.length === this.words.length) {
        this.disabled = true
        alert('Você encontrou todas as palavras!!!')
      }
    }
  }
}
</script>

<style>
.default {
  float: left;
  width: 100%;
}
.flex{
  display: flex;
  flex-direction: row;
}
.padding{
  padding-left: 40%;
  padding-right: 40%;
}
.space {
  white-space: pre;
  text-align: justify;
}
.labelWords {
  margin-top: 3%;
  margin-left: 2%;
  font-weight: bold;
}
.backYellow{
  background-color: yellow;
  border: 0.1em solid yellow;
  border-radius: 0.2em;
}
.lineThrough{
  text-decoration-line: line-through;
}
@media screen and (max-width: 799px){
  .padding{
    padding-left: 20%;
    padding-right: 0;
  }
}
@media screen and (max-width: 480px){
  .padding{
    padding-left: 0%;
  }
}
</style>
