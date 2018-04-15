import faker from 'faker';

export const GET_LISTS_START = 'GET_LISTS_START';
export const GET_LISTS = 'GET_LISTS';
export const MOVE_CARD = 'MOVE_CARD';
export const MOVE_LIST = 'MOVE_LIST';
export const TOGGLE_DRAGGING = 'TOGGLE_DRAGGING';

export function getLists(daySchedules) {
  return dispatch => {
    var numberOfDays = daySchedules.length;
    dispatch({ type: GET_LISTS_START, numberOfDays });
    setTimeout(() => {
      const lists = [];
      for (let i = 0; i < numberOfDays; i++) {
        const cards = [];
        for (let ic = 0; ic < daySchedules[i].places.length; ic++) {
          cards.push(daySchedules[i].places[ic]);
        }
        lists.push({
          id: i,
          name: 'Day ' + (i+1),
          cards,
          dayScheduleId: daySchedules[i].dayScheduleId
        });
      }
      dispatch({ type: GET_LISTS, lists, isFetching: true });
    }, 1000); // fake delay
    dispatch({ type: GET_LISTS_START, isFetching: false });
  };
}

export function moveList(lastX, nextX) {
  return (dispatch) => {
    dispatch({ type: MOVE_LIST, lastX, nextX });
  };
}

export function moveCard(lastX, lastY, nextX, nextY) {
  return (dispatch) => {
    dispatch({ type: MOVE_CARD, lastX, lastY, nextX, nextY });
  };
}

export function toggleDragging(isDragging) {
  return (dispatch) => {
    dispatch({ type: TOGGLE_DRAGGING, isDragging });
  };
}
