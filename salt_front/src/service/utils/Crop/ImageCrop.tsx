import React, { useState, useRef } from 'react'

import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from 'react-image-crop'
import { canvasPreview } from './canvasPreview.ts'
import { useDebounceEffect } from './useDebounceEffect.ts'

import 'react-image-crop/dist/ReactCrop.css'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import {
  changePeoplePhoto,
  changePersonPhoto,
  loginCameraCheck,
  offUploadSwitch,
} from '../../../store/store'
import { useNavigate } from 'react-router-dom'

// This is to demonstate how to make and center a % aspect crop
// which is a bit trickier so we use some helper functions.
function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 100,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  )
}
interface CompletedCrop {
  x: number
  y: number
  width: number
  height: number
  unit: string
  aspect: number
}

export default function ImageCrop() {
  let state = useSelector((state) => {
    return state
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [imgSrc, setImgSrc] = useState('')
  const previewCanvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const [scale, setScale] = useState(1)
  const [rotate, setRotate] = useState(0)
  const [aspect, setAspect] = useState<number | undefined>(1 / 1)

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined) // Makes crop preview update between images.
      const reader = new FileReader()
      reader.addEventListener('load', () =>
        setImgSrc(reader.result.toString() || '')
      )
      reader.readAsDataURL(e.target.files[0])
    }
  }

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget
      setCrop(centerAspectCrop(width, height, aspect))
    }
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate
        )
        // imgPreview(imgRef.current, completedCrop, scale, rotate)
      }
    },
    100,
    [completedCrop, scale, rotate]
  )
  const getGenerateDownload = () => {
    const canvas = previewCanvasRef.current as HTMLCanvasElement
    const cropObject = completedCrop as CompletedCrop

    // generateDownload(canvas, cropObject)
    if (!canvas || !cropObject) {
      return
    } else {
      canvas.toBlob(
        (blob) => {
          const formData = new FormData()
          formData.append('myImg', blob)
          formData.append('userId', state.loginCheck.id)
          formData.append('userNickName', state.loginCheck.nickName)
          formData.append('userProfile', state.loginCheck.profile)

          axios
            .post('/upload', formData)
            .then((result) => {
              dispatch(loginCameraCheck(1))
              navigate('/home')
            })
            .catch((result) => {
              console.log(result + '!!!error!!!')
            })
        },
        'image/png',
        1
      )
      navigate('/home')
    }
  }
  return state.uploadSwitch == true ? (
    <div
      style={{
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        zIndex: '2',
      }}
    >
      <div
        className="ImageCrop"
        style={{
          position: 'fixed',
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.9)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '8%',
            background: 'white',
            top: '0',
          }}
          onClick={() => {
            dispatch(offUploadSwitch())
          }}
        >
          닫기
        </div>
        <div
          style={{
            maxHeight: '600px',
            width: '80%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: '1',
          }}
        >
          {Boolean(imgSrc) && (
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={aspect}
              style={{}}
            >
              <img
                ref={imgRef}
                alt="Crop me"
                src={imgSrc}
                style={
                  state.resize > 1000
                    ? {
                        maxHeight: '900px',
                        objectFit: 'contain',
                        maxWidth: '900px',
                        width: '100%',
                        height: '100%',
                        transform: `scale(${scale}) rotate(${rotate}deg)`,
                      }
                    : state.resize > 900
                    ? {
                        maxHeight: '700px',
                        objectFit: 'contain',
                        width: '100%',
                        maxWidth: '700px',
                        height: '100%',
                        top: '0',
                        transform: `scale(${scale}) rotate(${rotate}deg)`,
                      }
                    : {
                        maxHeight: '500px',
                        objectFit: 'contain',
                        width: '100%',
                        height: '100%',
                        top: '0',
                        transform: `scale(${scale}) rotate(${rotate}deg)`,
                      }
                }
                onLoad={onImageLoad}
              />
            </ReactCrop>
          )}
        </div>
        {Boolean(completedCrop) && (
          <canvas
            ref={previewCanvasRef}
            style={{
              display: 'none',
              position: 'absolute',
              border: '1px solid black',
              objectFit: 'contain',
              width: completedCrop.width,
              height: completedCrop.height,
            }}
          />
        )}
        <div
          className="Crop-Controls"
          style={{
            position: 'fixed',
            bottom: '0',
            height: '15%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ height: '20%' }}>
            {/* <label htmlFor="rotate-input">Rotate: </label> */}
            <input
              id="rotate-input"
              type="range"
              min={-180}
              max={180}
              value={rotate}
              disabled={!imgSrc}
              onChange={(e) =>
                setRotate(Math.min(180, Math.max(-180, Number(e.target.value))))
              }
            />
          </div>
          <form
            encType="multipart/form-data"
            // onSubmit={handlePhotoSubmit}
            style={{
              height: '80%',
              width: '100%',
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: '30%',
                height: '50%',
                background: 'grey',
                // overflow: 'hidden',
                position: 'relative',
                opacity: '1',
                borderRadius: '30px',
                display: 'flex',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                사진올리기
              </div>
              <input
                style={{
                  width: '100%',
                  height: '100%',
                  opacity: '0',
                  background: 'red',
                  position: 'absolute',
                }}
                type="file"
                name="myImg"
                accept="image/*"
                onChange={onSelectFile}
              />
            </div>
            <div
              style={{
                width: '30%',
                height: '50%',
                background: 'grey',
                // overflow: 'hidden',
                position: 'relative',
                opacity: '1',
                borderRadius: '30px',
                display: 'flex',
              }}
            >
              <button
                type="button"
                // type="submit"
                disabled={!completedCrop?.width || !completedCrop?.height}
                onClick={getGenerateDownload}
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  background: 'grey',
                  borderRadius: '30px',
                }}
              >
                Upload
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  )
}
