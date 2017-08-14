import { combineReducers } from 'redux'
//  Core reducers
import { routerReducer as routing } from 'react-router-redux'
import {responsiveStateReducer as screen} from 'redux-responsive'
import { reducer as form } from 'redux-form'
import { firebaseStateReducer as firebase } from 'react-redux-firebase'
//  Your reducers
import toasts from '../services/toast'

export const reducers = combineReducers({
  //  Core reducers - removal is a breaking change
  routing,
  screen,
  form,
  firebase,
  //  Toasts - User-friendly notifications (events, errors, etc).
  toasts
})
