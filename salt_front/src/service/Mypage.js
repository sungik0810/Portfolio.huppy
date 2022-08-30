import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changePersonPhoto } from '../store/store'

import ContentsImage from './Contentsimage'
import Misson from './Misson'
import page from './Page.module.css'
function Mypage() {
  let state = useSelector((state) => {
    return state
  })
  const dispatch = useDispatch()
  useEffect(() => {
    if (state.loginCheck.check) {
      axios
        .post('/personphoto', { user: state.loginCheck })
        .then((result) => {
          const personDatas = [...result.data]
          dispatch(changePersonPhoto(personDatas))
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
        <div className={page.service_page_top_item}>Hope ure Happy</div>
      </div>
      <div className={page.service_page_middle}>
        <div className={page.service_page_middle_wrap}>
          {state.personPhoto.data.length > 0 ? (
            state.personPhoto.data.map((photo) => {
              return <ContentsImage photo={photo} key={`${photo._id}my`} />
            })
          ) : (
            <div className={page.service_page_middle_none}>게시물 없음</div>
          )}
        </div>

        {/* <ContentsImage /> */}
        {/* <ContentsImage /> */}
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

export default Mypage
