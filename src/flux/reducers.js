import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import {responsiveStateReducer as screen} from 'redux-responsive'
import { reducer as form } from 'redux-form'
import { firebaseStateReducer as firebase } from 'react-redux-firebase'

export const reducers = combineReducers({
  routing,
  screen,
  form,
  firebase
  // your reducers here
})
