import { combineReducers } from 'redux'
import city from './city_reducer'
import place from './place_reducer'
import placeDetails from './placeDetails_reducer'
import lists from './lists'

const compareApp = combineReducers({
  city,
  place,
  placeDetails,
  lists
})

export default compareApp
