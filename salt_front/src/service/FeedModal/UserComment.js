import { LOCAL_HOST } from '../../App'

export default function UserComment(comment) {
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '25%',
        minHeight: '50px',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          overflow: 'hidden',
          width: '36px',
          height: '36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'grey',
          borderRadius: '50%',
          marginLeft: '20px',
          marginRight: '20px',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img
            style={{ height: '100%' }}
            src={`${LOCAL_HOST}/profile/${comment.comment.user_profile}`}
            alt="#"
          />
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div style={{ marginRight: '15px' }}>
          {comment.comment.user_nickName}
        </div>
      </div>
      <div>{comment.comment.comment}</div>
    </div>
  )
}
