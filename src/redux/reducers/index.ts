import { addPerson, addTodo, removePerson, setVisibilityFilter, toggleTodo } from '../actions/index'
import { Person } from '../data.d'
import actionTypes from '../actions/actionTypes'
import { combineReducers } from 'redux'

// type Actions = ReturnType<typeof addPerson> | ReturnType<typeof removePerson>

// const initialState: Person[] = [{ id: '1', name: '小萝莉' }]

// export const peopleReducer = (state = initialState, action: Actions) => {
//   switch (action.type) {
//     case actionTypes.ADD_PERSON:
//       return state.concat([
//         {
//           id: (Math.random() * 1000000).toFixed(0),
//           name: action.payload,
//         },
//       ])
//     case actionTypes.REMOVE_PERSON:
//       return state.filter((person) => person.id !== action.payload)
//     default:
//       break
//   }
//   return state
// }

// todolist

type TodoSActions =
  | ReturnType<typeof addTodo>
  | ReturnType<typeof setVisibilityFilter>
  | ReturnType<typeof toggleTodo>

export const todos = (state = [], action: any) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false,
        },
      ]
    case 'TOGGLE_TODO':
      return state.map((todo: any) =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo,
      )
    default:
      return state
  }
}
export const visibilityFilter = (state = 'SHOW_ALL', action: any) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter
    default:
      return state
  }
}
export const todoApp = combineReducers({
  todos,
  visibilityFilter,
})
