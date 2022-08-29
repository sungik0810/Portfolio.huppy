const timeModule = require('./datestring.js')
const dateString = timeModule.dateString()

var ObjectId = require('mongodb').ObjectId
const likeAdd = (req) => {
  db.collection(`${dateString}`).updateOne(
    { _id: ObjectId(req.body.postNum) },
    { $set: { like: [...req.body.like, req.body.user] } },
    (error, result) => {
      return console.log('좋아요!')
    }
  )
}

const likeDelete = (req) => {
  db.collection(`${dateString}`).updateOne(
    { _id: ObjectId(req.body.postNum) },
    {
      $set: {
        like: [
          ...req.body.like.filter((a) => {
            return a !== req.body.user
          }),
        ],
      },
    },
    (error, result) => {
      return console.log('좋아요 취소')
    }
  )
}

exports.likeAdd = () => {
  return likeAdd()
}

exports.likeDelete = () => {
  return likeDelete()
}
