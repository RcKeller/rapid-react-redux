import { combineReducers } from 'redux'
/* *****
CORE REDUCERS
***** */
import { routerReducer as routing } from 'react-router-redux'
import {responsiveStateReducer as screen} from 'redux-responsive'
import { reducer as form } from 'redux-form'
import { firebaseStateReducer as firebase } from 'react-redux-firebase'
/* *****
YOUR REDUCERS
***** */
import toasts from '../services/toasts'
import rooms from '../services/rooms'

export const reducers = combineReducers({
  //  CORE
  routing,
  screen,
  form,
  firebase,
  //  YOUR REDUCERS
  //  Toasts - User-friendly notifications (events, errors, etc).
  toasts,
  //  Rooms - Chat rooms and messaging system
  rooms
})

/*
Recommended reading for managing your redux logic with duck modules
It can get out of hand rather easily.
https://github.com/erikras/ducks-modular-redux
https://medium.com/front-end-hacking/structuring-react-and-redux-applications-255361d24f84
*/
