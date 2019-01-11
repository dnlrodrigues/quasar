<template>
  <div class="container q-ma-lg">
    <div class="row">
      <div class="flex col-12 flexCenter">
        <div class="tabuleiro flexCenter">
          <div class="border flexCenter" v-for="(n, index) in nCasas" :key="index" @click="markChoice(index)" :disabled="disabled" :value="index">
            <span class=""> {{choices[index]}} </span>
          </div>
        </div>
        <div class="lateral">
          <div class="flexVertical">
            <label class="btn" :class="btnClass('X')" @click="btnClick('X')" :disabled="disabled"> X </label>
            <label class="btn" :class="btnClass('O')" @click="btnClick('O')" :disabled="disabled"> O </label>
          </div>
        </div>
      </div>
      <div class="flex col-12 line q-ma-lg">
        <q-btn class="btnReload" label="Reiniciar" color="secondary" @click="restart()"></q-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComponentJogoVelha',
  data () {
    return {
      nCasas: 9,
      selected: '',
      choices: ['', '', '', '', '', '', '', '', ''],
      disabled: false,
      lastChoice: ''
    }
  },
  methods: {
    btnClick (btnSelected, event) {
      if (!this.disabled) {
        if (this.lastChoice === btnSelected.toUpperCase()) {
          return alert('É a vez do outro jogador!')
        }
        this.selected = btnSelected.toUpperCase()
        this.lastChoice = btnSelected.toUpperCase()
      }
    },
    markChoice (index) {
      if (this.disabled) {
        return
      }

      this.choices[index] = this.selected
      this.selected = ''

      let type = {
        P: [1, 3, 5, 7],
        A: [0, 2, 6, 8, 4]
      }

      let winH, winV, winD = false

      if (type.P.includes(index)) {
        winH = this.checkGame('H', index)
        winV = this.checkGame('V', index)
      } else {
        winH = this.checkGame('H', index)
        winV = this.checkGame('V', index)
        winD = this.checkGame('D', index)
      }

      if (winH || winV || winD) {
        this.disabled = true
        return alert(`O jogador ${this.choices[index]} venceu!!!`)
      }

      for (var i = 0; i < this.choices.length; i++) {
        if (!this.choices[i]) {
          return
        }
      }

      this.disabled = true
      return alert('O jogo acabou! Deu Velha!!! (Risada do Drakes)')
    },
    restart () {
      this.nCasas = 9
      this.selected = ''
      this.choices = ['', '', '', '', '', '', '', '', '']
      this.disabled = false
      this.lastChoice = ''
    }
  },
  computed: {
    btnClass (type) {
      return (type) => {
        return {btnPrimary: (this.selected === type.toUpperCase())}
      }
    },
    checkGame (direction, index) {
      return (direction, index) => {
        let cases = {
          H: [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8]
          ],
          V: [
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8]
          ],
          D: [
            [0, 4, 8],
            [2, 4, 6]
          ]
        }

        for (var i = 0; i < cases[direction].length; i++) {
          if (cases[direction][i].includes(index)) {
            let n0 = cases[direction][i][0]
            let n1 = cases[direction][i][1]
            let n2 = cases[direction][i][2]
            if (this.choices[n0] === this.choices[n1] && this.choices[n0] === this.choices[n2]) {
              return true
            } else {
              return false
            }
          }
        }
      }
    }
  }
}
</script>

<style scoped>
  .flex{
    display: flex;
    flex-direction: row;
  }
  .flexCenter{
    align-items: center;
  }
  .flexVertical{
    flex-direction: column;
  }
  .tabuleiro{
    margin-left: 10em;
    margin-top: 3%;
    width: 35em;
    flex-wrap: wrap;
  }
  .lateral{
    width: 10em;
    float: right;
  }
  .border{
    width: 10em;
    height: 10em;
    float: left;
    text-align: center;
  }
  .border:nth-child(2), .border:nth-child(8){
    border-left: 0.5em solid black;
    border-right: 0.5em solid black;
  }
  .border:nth-child(4), .border:nth-child(6){
    border-top: 0.5em solid black;
    border-bottom: 0.5em solid black;
  }
  .border:nth-child(5){
    border: 0.5em solid black;
  }
  .border:nth-child(4), .border:nth-child(7),{
    clear: both;
  }
  span{
    font-size: 9em;
  }
  label{
    font-size: 10em;
  }
  .btn{
    border: 0.02em solid #ccc;
    border-radius: 0.03em;
    background-color: rgba(204, 204, 204, 0.8);
    width: 1em;
    margin: 0.08em 0.05em;
    float: left;
    text-align: center;
    cursor: pointer;
  }
  .btn:hover{
    color: #333;
    background-color: #e6e6e6;
    border-color: #adadad;
  }
  .btnPrimary{
    border-color: #034ea2 !important;
    background-color: #034ea2 !important;
    color: white;
  }
  .btnPrimary:hover{
    background-color: #286090 !important;
    border-color: #204d74 !important;
    color: white !important;
  }
  .btnReload{
    float: left;
    margin-top: 3em;
    margin-left: 23em;
  }
  @media screen and (max-width: 1275px) {
    .lateral{
      width: 100%;
      padding-top: 7%;
      padding-left: 30%;
    }
    /* .tabuleiro{
      margin-left: auto;
    } */
    .lateral{
      padding-left: 30%;
    }
    label{
      font-size: 8em !important;
    }
  }
  @media screen and (max-width: 737px){
    .lateral{
      padding-left: 20%;
    }
    .border{
      width: 30%;
      height: 7em;
    }
    span, label {
      font-size: 500% !important;
    }
  }
  @media screen and (max-width: 575px){
    .border{
      width: 30%;
      height: 7em;
    }
    .lateral{
      padding-left: 0;
    }
    .line{
      float: right;
    }
    .line button{
      margin-left: 0;
      float: right;
    }
  }
</style>
