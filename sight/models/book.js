import {
    HTTP
} from '../utils/util'

class BookModel extends HTTP {
    getHotList() {
        return this.request({
            url: 'books'
        })
    }
    getDetail(bid) {
        return this.request({
            url: 'books/bookdetail',
            method: 'POST',
            data: {
                bid: bid,
            }
        })
    }
}

export {
    BookModel
}