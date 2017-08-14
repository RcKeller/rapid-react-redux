/*
Recommended reading for managing your redux logic
It can get out of hand rather easily.
https://github.com/erikras/ducks-modular-redux
https://medium.com/front-end-hacking/structuring-react-and-redux-applications-255361d24f84
*/

/* *****
ACTIONS
http://docs.react-redux-firebase.com/history/v2.0.0/docs/recipes/thunks.html
***** */
import { addToast } from './toasts'
export const addRoom = user => {
  return function (dispatch, getState, getFirebase) {
    const firebase = getFirebase()
    const room = { owner: user.uid, messages: [] }
    firebase
      .pushWithMeta('/rooms', room)
      //  FIXME: The API has an onComplete param, but doesn't have a standard promise interface?
      //  We'll need to push the room ID to browserHistory...
      .then(() => {
        dispatch(addToast('Successfully created room'))
      })
      .catch((err) => {
        addToast('An unknown error occured - unable to create room')
        console.warn(err)
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
    default: return state
  }
}
