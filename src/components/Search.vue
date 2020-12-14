<template>
<body>
    <div class="title-page">My Favorite Books</div>
    <div id='book-list' v-html="result"></div>
    <br>
    <div id='page-navigation' v-html="page_nav"></div>
</body>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      page: 1,
      result: null,
      page_nav: null
    }
  },
  methods: {
    getPageNav (totalItem) {
      var str = `
      <nav aria-label="Page navigation example" style="margin-top: 10px">
      <ul class="pagination justify-content-center">`

      var navNum = Math.floor(totalItem / 30)
      var pageStart = Number(this.page) - 3
      if (pageStart < 1) {
        pageStart = 1
      } else if (pageStart > navNum - 6) {
        pageStart = navNum - 6
      }
      var pageFinish = pageStart + 5

      if (Number(this.page) > 1) {
        str = str.concat(`<li class="page-item"><a class="page-link" href="/page/${Number(this.page) - 1}">Previous</a></li>`)
      }
      if (Number(this.page) !== 1) {
        str = str.concat(`<li class="page-item"><a class="page-link" href="/page/1">1</a></li>`)
      } else {
        str = str.concat(`<li class="page-item"><a class="page-link btn-disabled" href="/page/1">1</a></li>`)
      }
      if (pageStart > 1) {
        str = str.concat(`<li class="page-item" disabled><a class="page-link">...</a></li>`)
      }

      for (var num = pageStart + 1; num < pageFinish + 1; num++) {
        if (Number(this.page) !== num) {
          str = str.concat(`<li class="page-item"><a class="page-link" href="/page/${num}">${num}</a></li>`)
        } else {
          str = str.concat(`<li class="page-item"><a class="page-link btn-disabled" href="/page/${num}">${num}</a></li>`)
        }
      }

      if (pageFinish + 1 < navNum) {
        str = str.concat(`<li class="page-item" disabled><a class="page-link">...</a></li>`)
      }

      if (Number(this.page) !== navNum) {
        str = str.concat(`<li class="page-item"><a class="page-link" href="/page/${navNum}">${navNum}</a></li>`)
      } else {
        str = str.concat(`<li class="page-item"><a class="page-link btn-disabled" href="/page/${navNum}">${navNum}</a></li>`)
      }

      if (Number(this.page) !== navNum) {
        str = str.concat(`<li class="page-item"><a class="page-link" href="/page/${Number(this.page) + 1}">Next</a></li>`)
      }

      str = str.concat('</ul></nav>')
      return str
    },

    createBookItem (book) {
      const _title = book.volumeInfo.title
      const _id = book.id

      var _imgSrc = ''
      var _author = ''
      var _date = ''
      var _desc = ''

      if (book.volumeInfo.imageLinks === undefined) {
        _imgSrc = '@/assets/not_found.jpg'
      } else {
        _imgSrc = book.volumeInfo.imageLinks.thumbnail
      }
      if (book.volumeInfo.authors === undefined) {
        _author = 'Unknown'
      } else {
        _author = book.volumeInfo.authors[0]
      }

      if (book.volumeInfo.publishedDate === undefined) {
        _date = 'Unknown'
      } else {
        _date = book.volumeInfo.publishedDate
      }

      if (book.volumeInfo.description === undefined) {
        _desc = 'Unknown'
      } else {
        _desc = book.volumeInfo.description
      }

      var str = `
            <div class="card shadow" onclick="location.href='../detail/${_id}'">
            <div class="card-body">
                <div class="row">
                <div class="col">
                    <img src="${_imgSrc}" class="card-img">
                </div>
                <div class="col">
                    <h4 class="card-title">${_title}</h4>
                    <hr>
                    <p class="card-text">${_desc}</p>
                </div>
                </div>
                
                <div class="row">
                <h6 class="card-made">${_author} (${_date})</h6>
                </div>
                
            </div>
            </div>
        `
      return str
    },

    getBooks () {
      axios
        .get(`https://www.googleapis.com/books/v1/volumes?q=Novel&startIndex=${(this.page - 1) * 30}&maxResults=30`)
        .then((response) => {
          var data = response.data
          var books = data.items
          var renderbooks = ''

          books.forEach((element) => {
            var bookItem = '<div class="book-item">'
            bookItem = bookItem.concat(this.createBookItem(element)).concat('</div>')
            renderbooks = renderbooks.concat(bookItem)
          })
          console.log(data)
          var pageNav = this.getPageNav(data.totalItems)
          this.result = renderbooks
          this.page_nav = pageNav
        })
        .catch((e) => {
          console.log(e.response.data.errors.message)
        })
    }
  },
  mounted () {
    if (!this.$route.params.page) {
      this.page = 1
    } else {
      this.page = this.$route.params.page
    }
    this.getBooks()
  }
}
</script>

<style>
body { padding-top: 50px; }
.title-page {
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    color: darkblue;
    font-weight: bolder;
    font-size: 48px;
}

.title-page:hover {
    color: rgba(2, 2, 12, 0.8);
}
</style>
