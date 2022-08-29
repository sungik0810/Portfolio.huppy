const instance = axios.create({
  url: '/like/add',
  method: 'post',
  baseURL: 'http://localhost:8080/',
  headers: { 'X-Custom-Header': 'foobar' },
  timeout: 1000,
})
