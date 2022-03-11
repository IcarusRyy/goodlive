// src/redux/actions/index.ts

import actionTypes from './actionTypes'
// 当一个用户名被添加时触发，该动作中包含了新的用户的名称
export const addPerson = (personName: string) => {
  return {
    type: actionTypes.ADD_PERSON,
    payload: personName,
  } as const
}
// 当一个用户名被删除时触发，该动作中包含了用户的id
export const removePerson = (id: string) => {
  return {
    type: actionTypes.REMOVE_PERSON,
    payload: id,
  } as const
}

// todolist
let nextTodoId = 0
export const addTodo = (text: any) => {
  return {
    type: 'ADD_TODO',
    id: nextTodoId++,
    text: text,
  }
}
export const setVisibilityFilter = (filter: any) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter,
  }
}

export const toggleTodo = (id: any) => {
  return {
    type: 'TOGGLE_TODO',
    id,
  }
}
