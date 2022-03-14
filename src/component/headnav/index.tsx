import React from 'react'
import { CarOutlined, DownOutlined, SearchOutlined } from '@ant-design/icons'
import './index.less'
import { Input } from 'antd'
const HeadNav = () => {
  return (
    <>
      <div id="home-header" className="clear-fix">
        <div className="home-header-left float-left">
          <span>北京</span>
          <DownOutlined />

          {/* <i className="icon-angle-down"></i> */}
        </div>
        <div className="home-header-right float-right">
          {/* <SearchOutlined /> */}
          <CarOutlined style={{ fontSize: '24px' }} />
          {/* <i className="iconfont icon-car"></i> */}
        </div>
        <div className="home-header-middle">
          <div className="search-container">
            {/* <i className="icon-search"></i> */}
            {/* <input /> */}
            <Input placeholder="请输入" className="input-antd" />
          </div>
        </div>
      </div>
    </>
  )
}
export default HeadNav
