/* *****
ACTIONS
***** */
export const addToast = text => ({ type: 'ADD_TOAST', text })
export const dismissToast = () => ({ type: 'DISMISS_TOAST' })

/* *****
REDUCER
***** */
export default function reducer (state = [], action) {
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
