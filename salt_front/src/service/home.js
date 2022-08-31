import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changePeoplePhoto } from '../store/store'

import ContentsImage from './Contentsimage'

import page from './Page.module.css'
export default function Home({ extraTime }) {
  let state = useSelector((state) => {
    return state
  })
  const dispatch = useDispatch()
  const [pageNum, setPageNum] = useState(0)

  useEffect(() => {
    if (state.loginCheck.check) {
      axios.get(`/peoplephoto/${pageNum}`).then((result) => {
        setPageNum(pageNum)
        const datas = [...result.data]
        dispatch(changePeoplePhoto(datas))
      })
    }
  }, [])
  const [isScrollEnd, setIsScrollEnd] = useState(false)
  function more() {
    if (state.loginCheck.check) {
      if (isScrollEnd === false) {
        axios.get(`/peoplephoto/${pageNum + 1}`).then((result) => {
          if (result.data.length === 0) {
            setIsScrollEnd(true)
          }
          if (isScrollEnd === false) {
            setPageNum(pageNum + 1)
            const datas = [...state.peoplePhoto.data, ...result.data]
            dispatch(changePeoplePhoto(datas))
          }
        })
      }
    }
  }

  const listInnerRef = useRef()

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current
      if (scrollTop + clientHeight === scrollHeight) {
        more()
      }
    }
  }
  return (
    <div className={page.service_page}>
      <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
        <img style={{ width: '8%' }} src="/img/title/top.png" />
      </div>
      <div className={page.service_page_top}>
        <div
          className={page.service_page_top_item}
          style={{
            width: '100%',
            fontSize: '2rem',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src="/img/icon/timer.png"
            style={{
              width: '15%',
              height: '100%',
              objectFit: 'contain',
            }}
          />
          <div style={{ fontStyle: 'oblique' }}>{extraTime}</div>
        </div>
      </div>
      <div
        className={page.service_page_middle}
        style={{ height: '85%' }}
        onScroll={onScroll}
        ref={listInnerRef}
      >
        <div className={page.service_page_middle_wrap}>
          {state.peoplePhoto.data.length > 0 ? (
            state.peoplePhoto.data.map((photo) => {
              return <ContentsImage photo={photo} key={photo._id} />
            })
          ) : (
            <div className={page.service_page_middle_none} style={{}}>
              <div
                className={`${page.loader} ${page.loader_black} ${page.loader_1}`}
              ></div>
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          zIndex: '-1',
        }}
      >
        <img style={{ width: '8%' }} src="/img/title/bottom.png" />
      </div>
    </div>
  )
}
