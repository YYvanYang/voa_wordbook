import { createStore as reduxCreateStore } from "redux"

const reducer = (state, action) => {
  switch (action.type) {
    case `REPEAT_TYPE`:
      let repeatType = updateType(state)
      return { ...state, repeatType }
    case `DRAWER_OPEN`:
      return { ...state, open: !state.open }
    default:
      return state
  }
}

function updateType(state) {
  switch (state.repeatType) {
    case null:
      return "all"
    case "all":
      return "one"
    case "one":
      return null
    default:
      return null
  }
}

// repeatType: null, one, all
const initialState = { repeatType: null, open: false }

const createStore = () => reduxCreateStore(reducer, initialState)
export default createStore
