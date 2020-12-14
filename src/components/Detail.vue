<template>
<body>
  <h1>Book Detail</h1>
    <div class="card-body">
        <div class="row">
          <div class="detail-col">
            <img :src=book.volumeInfo.imageLinks.thumbnail class="detail-card-img">
          </div>
          <div class="col">
            <h4 class="card-title"><a href="#"></a>{{ book.volumeInfo.title }}</h4>
            <hr>
            <div v-html="bookDes">
            </div>
            <button type="button" class="btn btn-light btn-lg"><a :href="'https://books.google.co.id/books?id=' + book.id + '&printsec=frontcover#v=onepage&q&f=true'">Preview</a></button>
          </div>
        </div>
        <div class="row">
          <h6 class="card-made">{{ book.volumeInfo.authors[0] }} ({{ book.volumeInfo.publishedDate }})</h6>
        </div>
        <div v-for="value in book.volumeInfo.industryIdentifiers" :key="value.type">
          <div class="row">
            <p class="card-text">{{ value.type }}: {{ value.identifier }}</p>
          </div>
        </div>
        <div class="row">
          <p class="card-text">Length : {{ book.volumeInfo.pageCount }} pages</p>
        </div>
      </div>
</body>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      book: null,
      bookDes: null
    }
  },
  methods: {
    renderBook () {
      axios
        .get('https://www.googleapis.com/books/v1/volumes/' + this.$route.params.id)
        .then((response) => {
          console.log(response)
          if (!response.data.volumeInfo.description) {
            this.bookDes = 'no description'
          } else {
            this.bookDes = response.data.volumeInfo.description
          }
          this.book = response.data
        })
        .catch((e) => {
          console.log(e)
          console.log(e.response.data.errors.message)
        })
    }
  },
  mounted () {
    this.renderBook()
  }
}
</script>

<style>
body { padding-top: 70px; }
</style>
