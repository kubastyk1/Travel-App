import * as types from '../constants/types'

export const getCities = () =>
  dispatch =>
    fetch(`cities.json`)
      .then(response => response.json())
      .then(response => {
        dispatch({
          type: types.FETCH_TRAVEL,
          payload: response.cities
        })
      })

export const getPlaces = () =>
  dispatch =>
    fetch(`places.json`)
      .then(response => response.json())
      .then(response => {
        dispatch({
          type: types.FETCH_TRAVEL,
          payload: response.places
        })
      })

export const getPlaceDetails = () =>
  dispatch =>
    fetch(`placeDetails.json`)
      .then(response => response.json())
      .then(response => {
        dispatch({
          type: types.FETCH_TRAVEL,
          payload: response.placeDetails
        })
      })
