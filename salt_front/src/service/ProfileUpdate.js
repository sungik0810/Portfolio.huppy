import axios from 'axios'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginCheckOk, loginProfile } from '../store/store'
import page from './Page.module.css'
import { LOCAL_HOST } from '../App'
export default function ProfileUpdate() {
  let state = useSelector((state) => {
    return state
  })
  let dispatch = useDispatch()
  let navigate = useNavigate()
  const [profileImg, setProfileImg] = useState([])

  const handleProfileSubmit = (e) => {
    e.stopPropagation()
    e.preventDefault()
    //프로필 이미지 프론트에서 바꾸기
    dispatch(loginProfile(`${profileImg[0].name}`))

    const formData = new FormData()
    formData.append('myProfile', profileImg[0])
    formData.append('user', JSON.stringify(state.loginCheck))

    axios
      .post('/profile/upload', formData)
      .then((result) => {
        setProfileImg([])
        localStorage.removeItem('token')
        localStorage.setItem('token', result.data.token)
        dispatch(loginCheckOk(result.data))
        navigate(`/mypage/${state.loginCheck.id}`)
      })
      .catch((result) => {
        console.log(result + '!!!error!!!')
      })
  }
  const handleProfileUpload = (e) => {
    e.stopPropagation()
    e.preventDefault()
    setProfileImg(e.target.files)
  }
  return (
    <form
      onClick={(e) => {
        e.stopPropagation()
      }}
      encType="multipart/form-data"
      onSubmit={handleProfileSubmit}
      className={page.service_page}
    >
      {/* 사진 */}
      <div
        className={page.service_page_bottom}
        style={{
          height: '25.5%',
          minHeight: '158px',
          borderBottom: '1px solid #E8E2E2',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              maxWidth: '60px',
              maxHeight: '60px',
              overflow: 'hidden',
              background: 'grey',
              borderRadius: '50px',
            }}
          >
            <div
              style={{
                width: '60px',
                height: '60px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {profileImg[0] === undefined ? (
                <img
                  style={{ width: '100%' }}
                  src={`${LOCAL_HOST}/profile/${state.loginCheck.profile}`}
                />
              ) : (
                <img
                  style={{
                    width: '100%',
                  }}
                  src={URL.createObjectURL(profileImg[0])}
                  alt="#"
                />
              )}
            </div>
          </div>
          <div>
            {' '}
            <input
              style={{}}
              onClick={() => {}}
              onChange={handleProfileUpload}
              name="myProfile"
              accept="image/*"
              type="file"
            ></input>{' '}
          </div>
        </div>
      </div>
      {/* 이름 */}
      <div
        className={page.service_page_bottom}
        style={{
          height: '8.2%',
          maxHeight: '50px',
          borderBottom: '1px solid #E8E2E2',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {' '}
        <div
          style={{
            width: '35.5%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          아이디
        </div>
        <div
          style={{
            width: '64.5%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {state.loginCheck.id}
        </div>
      </div>
      {/* 닉네임 */}
      <div
        className={page.service_page_bottom}
        style={{
          height: '8.2%',
          maxHeight: '50px',
          borderBottom: '1px solid #E8E2E2',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            width: '35.5%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          사용자 이름
        </div>
        <div
          style={{
            width: '64.5%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <input placeholder={state.loginCheck.nickName}></input>
        </div>
      </div>
      {/* 빈칸 */}
      <div
        className={page.service_page_bottom}
        style={{ height: '26.3%', borderBottom: '1px solid #E8E2E2' }}
      ></div>
      {/* 저장 버튼 */}
      <div className={page.service_page_bottom} style={{ height: '31.8%' }}>
        <button
          type="submit"
          style={{
            width: '77%',
            height: '31%',
            maxWidth: '300px',
            maxHeight: '60px',
          }}
        >
          저장하기
        </button>
      </div>
    </form>
  )
}
