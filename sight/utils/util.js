import {
    config
} from '../config.js'

class HTTP {
    request({
        url,
        data = {},
        method = 'GET'
    }) {
        return new Promise((resolve, reject) => {
            this._request(url, resolve, reject, data, method)
        })
    }
    _request(url, resolve, reject, data = {}, method = 'GET') {
        // if (!params.method) {
        //   params.method = "GET"
        // }
        wx.request({
            url: config.api_base_url + url,
            method: method,
            data: data,
            header: {
                'content_type': 'application/json',
            },
            success: (res) => {
                console.log(res)
                resolve(res)
            },
            fail: (err) => {
                reject()
                this._show_error(1)
            }

        })
    }
}
export {HTTP}