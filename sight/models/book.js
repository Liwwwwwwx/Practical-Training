import { HTTP } from '../utils/util'

class BookModel extends HTTP {
    getHotList(){
        return this.request({
            url:'books'
        })
    }
}

export {BookModel}