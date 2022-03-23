// import { combineReducers } from 'redux'
// import todos from './todos'
// import visibilityFilter from './visibilityFilter'

// todolist
// 对外统一的 reducer
// export const todoApp = combineReducers({
//   todos,
//   visibilityFilter,
// })

// goodlive

import { combineReducers } from 'redux'
import city from './city'
import search from './search'

const rootReducer = combineReducers({
  city,
  search,
})

export default rootReducer
