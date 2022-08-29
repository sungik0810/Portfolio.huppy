var router = require('express').Router()
const { filterObjFunction } = require('../functions.js')
const filterObj = filterObjFunction()
router.post('/login', (req, res) => {
  const admin_id = req.body.admin_id
  const admin_pw = req.body.admin_pw
  req.app.db
    .collection('admin')
    .findOne({ admin_id: admin_id }, (error, result) => {
      res.status(200).json({ admin_login: 'ok' })
    })
})

router.get('/userAll', (req, res) => {
  req.app.db
    .collection('login')
    .find({})
    .toArray((error, result) => {
      const userAll = [...result]
      const userAll_removePw = []
      userAll.map((user) => {
        const userData = filterObj(user, function (key, value) {
          return key !== 'pw'
        })
        return userAll_removePw.push(userData)
      })
      console.log(userAll_removePw)
      return res.status(200).json({ userAll: userAll_removePw })
    })
})

module.exports = router
