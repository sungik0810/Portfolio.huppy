const bcrypt = require('bcrypt')

// 오브젝트 필터링
function filterObj(obj, predicate) {
  var result = {},
    key
  for (key in obj) {
    if (obj.hasOwnProperty(key) && predicate(key, obj[key])) {
      result[key] = obj[key]
    }
  }
  return result
}
// 비밀번호 암호화
const comparePassword = async (password, hash) => {
  const ok = await bcrypt.compare(password, hash)
  return ok
}

exports.filterObjFunction = () => {
  return filterObj
}
exports.comparePasswordFuction = () => {
  return comparePassword
}
