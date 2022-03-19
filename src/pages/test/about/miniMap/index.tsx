import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import classNames from 'classnames'

import './index.less'

interface MinimapProps {
  content: string // minimap展示的日志内容
  logNode: HTMLDivElement // 日志的node节点
  visible?: boolean
  setIsMinimapShow?: any
}

interface InitialData {
  initialTop?: string // 初次进入任务详情页面，渲染完成时日志节点距顶部的距离
  scale?: number // 缩放比例
  windowScrollToLogLen?: number // window滚动到日志上边界的距离（minimap完整显示的起始位置）
  windowScrollTotalLen?: number // window可滚动的总长度
  mapScrollLen?: number // minimap可滚动的长度
  slope?: number // minimap滚动方程的斜率
  intercept?: number // minimap滚动方程的截距
  sliderSlope?: number
  sliderIntercept?: number
}

const MINIMAP_MARGIN = 20
const MINIMAP_TOP = 55 // map固定定位时top值
const MINIMAP_WIDTH = 100
const HEADER_HEIGHT = 237.65625
const BODY_PADDING = 100 // body设置了下padding 计算时不可忽略
const WRAPPER_PADDING = 5

const changeStyle = (
  ele: HTMLElement,
  styles: {
    [key in keyof CSSStyleDeclaration]?: string
  },
) => {
  for (const [key, val] of Object.entries(styles)) {
    ele.style[key] = val
  }
}

const MiniMap: FC<MinimapProps> = (props) => {
  const { content, logNode } = props
  const [show, setShow] = useState<boolean>(false)
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false)

  const minimap = useRef<HTMLDivElement>(null)
  const initialData = useRef<InitialData>({} as InitialData)
  const slider = useRef<HTMLDivElement>(null)
  const logContent = useRef<HTMLDivElement>(null)
  const mouseY = useRef<number>(0) // 记录鼠标在minimap点击坐标

  const initMap = () => {
    if (minimap.current && logContent.current && initialData.current && slider.current) {
      window.scrollTo(0, 0)

      // Element.getBoundingClientRect() 方法返回元素的大小及其相对于视口的位置
      const logRect = logNode.getBoundingClientRect()
      // console.log(logRect, 'logRect')
      // console.log('content', content)
      // console.log(window.innerWidth, 'innerWidth')
      // console.log(logRect.right, 'logRect.right')
      // console.log(logRect.height, 'logRect.height')
      // console.log(minimap.current?.clientWidth, 'minimap.currrent')
      // minimap到屏幕右边的距离，随屏幕大小变化
      // const mapRight =
      //   //   // 只读的 Window 属性 innerWidth 返回以像素为单位的窗口的内部宽度。如果垂直滚动条存在，则这个属性将包括它的宽度。
      //   window.innerWidth -
      //   // dom 右边框距离 视图 左边的 距离
      //   logRect.right
      // // Element.clientWidth 属性表示元素的内部宽度，以像素计。该属性包括内边距 padding，但不包括边框 border、外边距 margin 和垂直滚动条（如果有的话）。
      // minimap.current?.clientWidth -
      // // miniMap 的 margin-right
      // MINIMAP_MARGIN
      // console.log(mapRight, 'mapRight')
      // 缩放比例
      const scale = MINIMAP_WIDTH / logRect.width
      // 距离顶部nav的距离
      const windowScrollToLogLen = logRect.y

      const a: any = document.querySelector('#root')
      const windowScrollTotalLen = a.clientHeight - document.body.clientHeight
      // console.log(document.querySelector('#root'), 'a')
      // console.log(document.body, 'document.body')
      // console.log(windowScrollTotalLen, 'windowScrollTotalLen')
      // 对日志内容进行等比例缩放
      logContent.current.style.transform = `scale(${scale})`
      logContent.current.style.width = logRect.width + 'px'
      logContent.current.style.height = logRect.height - 20 + 'px'
      const { scrollHeight, clientHeight } = minimap.current
      console.log(scrollHeight, 'scrollHeight', clientHeight, 'clientHeight')
      // 先设置为fixed定位，计算出滚动所需参数
      // changeStyle(minimap.current, {
      //   position: 'fixed',
      //   top: `${MINIMAP_TOP}px`,
      //   bottom: '10px',
      // })
      const mapScrollLen = scrollHeight - clientHeight
      console.log(mapScrollLen, 'aoScrollLen')
      // const slope = mapScrollLen / (windowScrollTotalLen - windowScrollToLogLen)
      // const intercept = -windowScrollToLogLen * slope
      // 计算出滑动到底部时，slider距离窗口上边缘的距离
      // eslint-disable-next-line prefer-const
      let bottomSliderTop = 0
      const sliderHeight = (window.innerHeight - HEADER_HEIGHT) * scale
      console.log(window.innerHeight, 'window.innerHeight')
      if (mapScrollLen) {
        bottomSliderTop = minimap.current.getBoundingClientRect().bottom - sliderHeight
      } else {
        bottomSliderTop =
          (logContent.current.getBoundingClientRect().height + BODY_PADDING) * scale +
          MINIMAP_TOP +
          WRAPPER_PADDING -
          sliderHeight
      }
      const sliderSlope =
        (bottomSliderTop - MINIMAP_TOP) / (windowScrollTotalLen - windowScrollToLogLen)
      const sliderIntercept = MINIMAP_TOP - windowScrollToLogLen * sliderSlope

      // changeStyle(minimap.current, {
      //   top: `${logRect.y}px`,
      //   right: `${mapRight > 0 ? mapRight : 0}px`,
      // })
      slider.current.style.height = `${sliderHeight}px`
      initialData.current = {
        scale,
        // initialTop: `${logRect.y}px`,
        windowScrollToLogLen,
        windowScrollTotalLen,
        // mapScrollLen,
        // slope,
        // intercept,
        sliderSlope,
        sliderIntercept,
      }
      setShow(true)
    }
  }
  const handleMinimapScroll = () => {
    if (minimap.current && logNode) {
      console.log('handleMiniMapScroll')
      console.log(window.pageYOffset, 'window.pageYOffset')
      // const { mapScrollLen, slope, intercept } = initialData.current
      // if (mapScrollLen === 0) return
      // const len = window.scrollY * slope + intercept
      // minimap.current.scrollTop = len
    }
  }
  const handleSliderScroll = () => {
    if (slider.current && logNode && initialData.current) {
      const { sliderIntercept, sliderSlope } = initialData.current
      const logRect = logNode.getBoundingClientRect()
      const scale = MINIMAP_WIDTH / logRect.width
      slider.current.style.top = `${-logRect.y * scale}px`
    }
  }
  // 滚动事件回调函数
  const windowScroll = () => {
    if (logNode && slider.current && minimap.current) {
      const logRect = logNode.getBoundingClientRect()
      if (logRect.y <= 0) {
        //   changeStyle(minimap.current, {
        //     position: 'fixed',
        //     top: `${MINIMAP_TOP}px`,
        //     bottom: '10px',
        //   })
        console.log(logRect, '滚动事件')

        console.log(slider.current, 'current')
        changeStyle(slider.current, {
          display: 'block',
          position: 'fixed',
          top: `${0}px`,
          left: `${minimap.current.getBoundingClientRect().left}px`,
        })
        handleMinimapScroll()
        handleSliderScroll()
      } else {
        //   changeStyle(minimap.current, {
        //     position: 'absolute',
        //     top: initialData.current.initialTop,
        //     bottom: 'auto',
        //   })
        slider.current.style.display = 'none'
      }
    }
  }
  const handleMinimapMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault()
    console.log('handleMinimapMouseDown')
    // const { windowScrollToLogLen, scale } = initialData.current
    // const { offsetY, clientY } = e.nativeEvent
    // const target = e.target as HTMLElement
    // // 计算点击处在原始日志的Y轴坐标(显示在屏幕中间)
    // if (target.className === 'log-content-wrapper') {
    //   const scrollY =
    //     windowScrollToLogLen + offsetY / scale - window.innerHeight / 2
    //   window.scrollTo(0, scrollY)
    // }

    // // 如果是遮罩框, 记录点击处距离屏幕上边缘Y轴坐标
    // if (target.className === 'slider-controller') {
    //   mouseY.current = clientY
    // }
  }, [])
  const handlePointerMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // const { sliderIntercept, sliderSlope } = initialData.current
    const { clientY } = e.nativeEvent
    console.log(clientY, 'clientY')
    if (isMouseDown && slider.current) {
      const mouseOffset = clientY - mouseY.current
      const top = slider.current.style.top.replace(/[^\d.]/g, '')
      // const windowOffset =
      //   (Number(top) + mouseOffset - sliderIntercept) / sliderSlope
      // window.scrollTo(0, windowOffset)
      mouseY.current = clientY
    }
  }
  const handlePointerUp = useCallback(() => {
    setIsMouseDown(false)
  }, [])

  const handleSliderDown = useCallback(() => {
    setIsMouseDown(true)
  }, [])

  useEffect(() => {
    // 监听滚动事件
    window.addEventListener('scroll', windowScroll)
    // 监听鼠标抬起事件
    window.addEventListener('mouseup', handlePointerUp)
    return () => {
      window.removeEventListener('scroll', windowScroll)
      window.removeEventListener('mouseup', handlePointerUp)
    }
  }, [logNode])
  useEffect(() => {
    if (content && logNode && content.replace(/<pre class="console-output">|<\/pre>/g, '')) {
      initMap()
    }
    // console.log('content', content.replace(/<pre class="console-output">|<\/pre>/g, ''))
    console.log('logNode', logNode)
  }, [content, logNode, minimap])
  return (
    <>
      <div
        onMouseDown={handleMinimapMouseDown}
        onMouseMove={handlePointerMove}
        className={classNames('log-minimap', { show: show })}
        ref={minimap}
      >
        <div
          ref={logContent}
          className="log-content-wrapper"
          dangerouslySetInnerHTML={{
            __html: content?.startsWith('<pre class="console-output">')
              ? content
              : `<pre class="console-output">${content}</pre>`,
          }}
        />
        <div
          ref={slider}
          onMouseDown={handleSliderDown}
          className={classNames('slider-controller', {
            mousedown: isMouseDown,
          })}
        />
      </div>
    </>
  )
}

export default MiniMap
