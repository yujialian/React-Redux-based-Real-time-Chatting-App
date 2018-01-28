import axios from 'axios'
import {
  Toast
} from 'antd-mobile'

//Block request
axios.interceptors.request.use(function(config) {
  Toast.loading('Loading...', 0)
  return config
})

//Block response
axios.interceptors.response.use(function(config) {
  Toast.hide()
  return config
})
