const express = require('express')
const router = express.Router()
const Mock = require('mockjs')

const homehot = require('./data/home/homehot')
const url = require('url')
const searchData = require('./data/search')
const { Random } = require('mockjs')

/**
 * 首页热门数据
 */
router.get('/home/hot1', (req, res) => {
  const cityName = url.parse(req.url, true).query.cityName

  res.send({
    status: 200,
    result: homehot.hot1,
    city: cityName,
  })
})

router.get('/home/hot2', (req, res) => {
  const cityName = url.parse(req.url, true).query.cityName

  res.send({
    status: 200,
    result: homehot.hot2,
    city: cityName,
  })
})

/**
 * 搜索页面
 */
router.get('/search', (req, res) => {
  // const search = url.parse(req.url, true).query.search
  let data = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'data|5': [
      {
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        // 'id|+1': 1,
        id: Random.integer(),
        title: Random.csentence(5, 8),
        houseType: '17/19层| 4室1厅 - 273.97 ㎡',
        price: `<h3>${Random.integer(10000, 20000)}</h3>`,
        'rentType|+1': ['整租', '合租'],
        img: Random.image('800x600', Random.color(), '#FFF', 'png', Random.cword(5)),
      },
    ],
    hasMore: Random.boolean(),
  })
  // console.log(search, 'search')
  res.send({
    status: 200,
    // result: searchData,
    result: data,
  })
})

/**
 * Mock测试
 */
router.get('/mock', (req, res) => {
  let data = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'data|5': [
      {
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        // 'id|+1': 1,
        id: Random.integer(),
        title: Random.csentence(5, 8),
        houseType: '17/19层| 4室1厅 - 273.97 ㎡',
        price: `<h3>${Random.integer(10000, 20000)}</h3>`,
        'rentType|+1': ['整租', '合租'],
        img: Random.image('800x600', '#CCC', '#FFF', 'png', '宜居·品质享受'),
      },
    ],
  })
  res.send(data)
})

module.exports = router
