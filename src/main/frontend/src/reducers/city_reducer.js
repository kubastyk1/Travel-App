import * as types from '../constants/types'

const INITIAL_STATE = {
  cities: []
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.FETCH_TRAVEL:
      return {
        ...state, cities: action.payload.map(city =>
          ({...city})
        )
      }
    default:
      return state
  }
}
