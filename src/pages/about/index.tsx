import React from 'react'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about/haha">haha</Link>
          </li>
        </ul>
        <hr />
        <h1>About</h1>
      </div>
    </>
  )
}
export default About