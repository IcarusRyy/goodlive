import { logData, logData2 } from '@/pages/constant'
import { Button } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './index.less'
import MiniMap from './miniMap'
const About = () => {
  const [logDataa, setLogData] = useState<any>()
  const logRef = useRef<any>(null)
  const handleClick = () => {
    console.log(logRef)
  }
  useEffect(() => {
    setTimeout(() => setLogData(logData2), 10)
  }, [])
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
        <div
          style={{
            fontSize: '18px',
            color: 'red',
            backgroundColor: 'skyBlue',
            textAlign: 'center',
          }}
        >
          字体大小能继承，颜色可以，背景颜色也可以<div>1</div>
        </div>
        <Button onClick={handleClick}>打印</Button>
        <Button>1</Button>
        <div id="about-box" style={{ position: 'relative', maxWidth: '1400px' }}>
          <div className="about" dangerouslySetInnerHTML={{ __html: logDataa }} ref={logRef}></div>
          <MiniMap content={logDataa} logNode={logRef.current} />
        </div>
      </div>
    </>
  )
}
export default About
