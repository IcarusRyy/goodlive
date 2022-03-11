import { combineReducers, createStore } from 'redux'
import { Store } from 'redux'
import { AppState } from './data.d'

import { todoApp } from './reducers/index'

// const rootReducer = combineReducers<AppState>({
//   people: peopleReducer,
// })

// function configureStore(): Store<AppState> {
//   const store = createStore(rootReducer, undefined)
//   return store
// }

// export const storeData = configureStore()

// todolist
export const todoStore = createStore(todoApp)
