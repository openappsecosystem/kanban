export const flags = (state = [], action) => {
    switch (action.type) {
      case 'ADD_FLAG': {
        return action.payload
      }
      default: {
        return state
      }
    }
}
