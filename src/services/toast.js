/*
Recommended reading for managing your redux logic
It can get out of hand rather easily.
https://github.com/erikras/ducks-modular-redux
https://medium.com/front-end-hacking/structuring-react-and-redux-applications-255361d24f84
*/

/* *****
ACTIONS
***** */
// export const addToast = text => {
//   return { type: 'ADD_TOAST', text }
// }
export const addToast = text => ({ type: 'ADD_TOAST', text })
export const dismissToast = () => ({ type: 'DISMISS_TOAST' })

/* *****
REDUCERS
***** */
function reducer (state = [], action) {
  switch (action.type) {
    case 'ADD_TOAST':
      // FYI reg. namespaces, [Action] is the react-md label for the close button.
      return [...state, {...action, action: 'Close'}]
    case 'DISMISS_TOAST':
      //  Slice creates a new array, minus an element
      return state.slice(1)
    default: return state
  }
}
export default reducer
