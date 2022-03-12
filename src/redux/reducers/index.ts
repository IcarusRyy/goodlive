import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'

// todolist
// 对外统一的 reducer
export const todoApp = combineReducers({
  todos,
  visibilityFilter,
})
