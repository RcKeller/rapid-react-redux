import { browserHistory } from 'react-router'
/* *****
ACTIONS
http://docs.react-redux-firebase.com/history/v2.0.0/docs/recipes/thunks.html
***** */
import { addToast } from './toasts'
export const addRoom = user => {
  return function (dispatch, getState, getFirebase) {
    const room = { owner: user.uid, messages: [] }
    getFirebase()
      .pushWithMeta('/rooms', room)
      //  NOTE: React-Redux-Firebase docs are incomplete, but v2 will return a response object.
      //  Here we select the key returned, then dispatch actions with it.
      .then(({ key}) => {
        dispatch({ type: 'ADD_ROOM', room: key })
        dispatch(addToast('Successfully created room'))
        browserHistory.push(`/chat/${key}`)
      })
      .catch((err) => {
        dispatch({ type: 'ADD_ROOM_ERROR', err })
        addToast('An unknown error occured - unable to create room')
      })
  }
}

/* *****
REDUCER
***** */
export default function reducer (state = [], action) {
  switch (action.type) {
    case 'ADD_ROOM':
      // return [...state, {...action, action: 'Close'}]
      return [...state, action.room]
    case 'DELETE_ROOM':
      // return state.slice(1)
      return state
    case 'ADD_ROOM_ERROR':
      console.warn(action)
      return state
    default: return state
  }
}
