// src/redux/actions/index.ts

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
