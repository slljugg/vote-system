// import axios from 'axios';
// 不带请求器写法

// export default axios.create({
//   baseURL: 'http://localhost:3005/',
//   withCredentials: true,
// });
import axios from 'axios'
// 导入npogress 路由进度条
import Nporgress from 'nprogress'
import 'nprogress/nprogress.css'

axios.create()
axios.defaults.baseURL = 'http://121.43.169.175:3005/'
axios.defaults.withCredentials = true
// // 在request拦截器中，显示进度条 Nporgress.start()
// 配置axios的请求拦截器
axios.interceptors.request.use(config => {
  Nporgress.start()
  // 为请求头的Authorizationpe属性添加token
  // console.log(config)
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
// 在response拦截器中隐藏进度条 Nporgress.done()
axios.interceptors.response.use(config => {
  Nporgress.done()
  return config
})

export default axios
