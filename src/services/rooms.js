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
      //  FIXME: The API has an onComplete param, but doesn't have a standard promise interface?
      //  We'll need to push the room ID to browserHistory...
      .then(({key}) => {
        dispatch({ type: 'ADD_ROOM' })
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
      return state
    case 'DELETE_ROOM':
      // return state.slice(1)
      return state
    case 'ADD_ROOM_ERROR':
      console.warn(action)
      return state
    default: return state
  }
}
