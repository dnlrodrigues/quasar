const SET_INC_LIST = (state, game) => {
  state.listGame.push(game)
}

const SET_SAVE = (state, game) => {
  let index = state.listGame.indexOf(item => item.id === parseInt(game.id))
  state.listGame[index] = game
}

const SET_DELETE = (state, id) => {
  let index = state.listGame.indexOf(item => item.id === parseInt(id))
  state.listGame.splice(index, 1)
}

export default {
  SET_INC_LIST,
  SET_SAVE,
  SET_DELETE
}

/* export function incrementList (state, game) {
  state.listGame = game
} */
