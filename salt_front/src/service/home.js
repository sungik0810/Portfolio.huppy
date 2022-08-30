import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changePeoplePhoto } from '../store/store'

import ContentsImage from './Contentsimage'
import FeedClick from './FeedModal/FeedClick'
import Misson from './Misson'
import page from './Page.module.css'
export default function Home({ extraTime }) {
  let state = useSelector((state) => {
    return state
  })
  const dispatch = useDispatch()
  useEffect(() => {
    if (state.loginCheck.check) {
      axios
        .get('/peoplephoto')
        .then((result) => {
          const datas = [...result.data]
          dispatch(changePeoplePhoto(datas))
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [])

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
              // position: 'absolute',
              width: '15%',
              height: '100%',
              objectFit: 'contain',
            }}
          />
          <div style={{}}>{extraTime}</div>
        </div>
      </div>
      <div className={page.service_page_middle}>
        <div className={page.service_page_middle_wrap}>
          {state.peoplePhoto.data.length > 0 ? (
            state.peoplePhoto.data.map((photo) => {
              return <ContentsImage photo={photo} key={photo._id} />
            })
          ) : (
            <div className={page.service_page_middle_none}>error</div>
          )}
        </div>
      </div>
      <div className={page.service_page_bottom}>
        <Misson />
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
          }}
        >
          <img style={{ width: '8%' }} src="/img/title/bottom.png" />
        </div>
      </div>
    </div>
  )
}
