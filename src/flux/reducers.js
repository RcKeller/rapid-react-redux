import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import { reducer as form } from 'redux-form'
import {responsiveStateReducer as screen} from 'redux-responsive'

// main reducers
export const reducers = combineReducers({
  routing,
  form,
  screen
  // your reducer here
})
