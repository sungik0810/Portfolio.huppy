export default function UserComment(comment) {
  //   console.log(comment)
  return (
    <div style={{ display: 'flex' }}>
      <div
        style={{
          width: '30%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <>{comment.comment.user_nickName}</>
      </div>
      <div>{comment.comment.comment}</div>
    </div>
  )
}
