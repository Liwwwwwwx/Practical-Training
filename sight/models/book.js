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
    getComments(bid) {
        return this.request({
            url:'books/getcomment',
            method:'POST',
            data:{
                bookid:bid
            }
        })
    }
    commentPlusOne(bid,comment){
        return this.request({
            url:'books/commentplusone',
            method:'POST',
            data:{
                bookid:bid,
                comment:comment
            }
        })
    }
}

export {
    BookModel
}