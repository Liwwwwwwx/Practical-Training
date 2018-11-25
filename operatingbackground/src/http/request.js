import axios from 'axios'

export default function request({ url, method = 'GET', data }) {
    return new Promise((resolve, reject) => {
        let options = { url, method }
        if (method.toUpperCase() === 'GET') {
            options.params = data
        } else {
            options.data = data
        }
        var instance = axios.create({
            headers: {'content-type': 'application/x-www-form-urlencoded'}
        })
        return instance(options)
            .then(res => {
                resolve(res) 
                }
            )
            .catch(error => {
                reject(error.response)
            })
    })
}

