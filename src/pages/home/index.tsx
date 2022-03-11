import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Person, AppState } from '@/redux/data.d'
import { Button } from 'antd'
import { addPerson, removePerson } from '@/redux/actions'
import './index.less'
const Home = () => {
  // const people: Person[] = useSelector((state: AppState) => state.people)
  // const dispatch = useDispatch();
  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   dispatch(addPerson(newPerson));
  // }
  // const dispatchNewPerson = (id: number) => () => {
  //   dispatch(removePerson(id));
  // };
  return (
    <>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
        <hr />
        <h1>Home</h1>
      </div>
      <div>
        {/* <Button onClick={dispatchNewPerson(person.id)}>Remove</Button> */}
        <Button type="primary">登陆</Button>
      </div>
    </>
  )
}
export default Home
