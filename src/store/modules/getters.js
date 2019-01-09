const GET_GAME = (state) => (id) => {
  return state.listGame.find(item => item.id === parseInt(id))
}

const GET_ID_LAST = (state) => {
  let size = state.listGame.length
  let index = (size > 0) ? (size - 1) : size
  return (state.listGame[index]) ? state.listGame[index].id : 0
}

export default {
  GET_GAME,
  GET_ID_LAST
}
