import * as types from '../constants/types'

const INITIAL_STATE = {
  placeDetails: []
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.FETCH_TRAVEL:
      return {
        ...state, placeDetails: action.payload.map(placeDetails =>
          ({...placeDetails})
        )
      }
    default:
      return state
  }
}
