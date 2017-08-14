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
  routing,
  screen,
  form,
  firebase,
  //  Toasts - User-friendly notifications (events, errors, etc).
  toasts,
  //  Rooms - Chat rooms and messaging system
  rooms
})
