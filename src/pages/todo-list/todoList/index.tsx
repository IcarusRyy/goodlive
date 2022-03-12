import React from 'react'
import { ToDo } from '..'
const TodoListComponent = ({ todos, onTodoClick }) => (
  <ul>
    {todos.map((todo) => (
      <ToDo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)} />
    ))}
  </ul>
)
export default TodoListComponent
