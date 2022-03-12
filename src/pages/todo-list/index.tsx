import React from 'react'
import { Link } from 'react-router-dom'
import AddTodo from './AddTodo'
import FilterLink from './containers/FilterLink'
import VisibleTodoList from './containers/VisibleTodoList'

export const ToDo = ({ onClick, completed, text }) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? 'line-through' : 'none',
    }}
  >
    {text}
  </li>
)
// export const TodoListComponent = ({ todos, onTodoClick }) => (
//   <ul>
//     {todos.map((todo) => (
//       <ToDo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)} />
//     ))}
//   </ul>
// )
export const LinkComponent = ({ active, children, onClick }) => {
  if (active) {
    return <span>{children}</span>
  }
  return (
    <a
      href=""
      onClick={(e) => {
        e.preventDefault()
        onClick()
      }}
    >
      {children}
    </a>
  )
}
export const FooterComponent = () => (
  <p>
    Show: <FilterLink filter="SHOW_ALL">All</FilterLink>
    {', '}
    <FilterLink filter="SHOW_ACTIVE">Active</FilterLink>
    {', '}
    <FilterLink filter="SHOW_COMPLETED">Completed</FilterLink>
  </p>
)
const TodoList = () => {
  return (
    <>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">about</Link>
          </li>
          <li>
            <Link to="/about/haha">haha</Link>
          </li>
        </ul>
        <hr />
        <h1>todoList</h1>
      </div>
      <div>
        <AddTodo />
        <VisibleTodoList />
        <FooterComponent />
      </div>
    </>
  )
}
export default TodoList
