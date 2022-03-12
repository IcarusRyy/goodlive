import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import { todoApp } from './reducers/index'

// todolist
export const todoStore = createStore(todoApp, composeWithDevTools())
