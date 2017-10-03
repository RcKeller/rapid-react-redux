import { createSelector } from 'reselect'

/* *****
BASIC SELECTORS
***** */
const getFirebase = state => state.firebase

/* *****
MEMOIZED SELECTORS (GENERAL)
***** */
export const errors = createSelector(
 [getFirebase],
 firebase => firebase.errors
)
export const user = createSelector(
  [getFirebase],
  firebase => Array.isArray(firebase.profile.providerData)
    ? firebase.profile.providerData[0]
    : firebase.profile.providerData
)
