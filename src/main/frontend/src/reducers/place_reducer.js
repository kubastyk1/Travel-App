import * as types from '../constants/types'

const INITIAL_STATE = {
  places: []
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.FETCH_TRAVEL:
      return {
        ...state, places: action.payload.map(place =>
          ({...place})
        )
      }
    default:
      return state
  }
}
