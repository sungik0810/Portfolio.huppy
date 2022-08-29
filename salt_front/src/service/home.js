import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changePeoplePhoto } from '../store/store'

import ContentsImage from './Contentsimage'
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
      <div className={page.service_page_top}>
        <div className={page.service_page_top_item}>{extraTime}</div>
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

        {/* <ContentsImage /> */}
        {/* <ContentsImage /> */}
      </div>
      <div className={page.service_page_bottom}>
        <Misson />
      </div>
    </div>
  )
}
