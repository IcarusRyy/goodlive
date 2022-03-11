import React from 'react'
import { Link } from 'react-router-dom'

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
    </>
  )
}
export default TodoList
