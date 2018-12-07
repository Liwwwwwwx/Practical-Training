import axios from 'axios'
import qs from 'qs'
export default function request({
  url,
  method = 'GET',
  data
}) {
  return new Promise((resolve, reject) => {
    let options = {
      url,
      method
    }
    if (method.toUpperCase() === 'GET') {
      options.params = data
    } else {
      options.data = qs.stringify(data)
    }
    var instance = axios.create({
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
    })
    return instance(options)
      .then(res => {
        resolve(res)
      })
      .catch(error => {
        reject(error.response)
      })
  })
}
