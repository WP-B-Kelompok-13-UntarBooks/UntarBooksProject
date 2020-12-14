<template>
  <div id="app">
    
    
<b-navbar toggleable="lg" class="navbar fixed-top navbar-expand-md navbar-dark text-white">
       <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
       <b-collapse id="nav-collapse" is-nav>
        
          <ul class="navbar-nav mr-auto">
             <li class="navbar-brand nav-link">
                <b-icon-book-half></b-icon-book-half>
                <a class="text" href="/">Your Books Catalog</a>
             </li>
             <li class="nav-item">
                 <a class="nav-link" href="/">
                     Home
                 </a>
             </li>
             <li class="nav-item">
                 <a class="nav-link" href="savedbook">
                     Saved Book
                 </a>
             </li>
             <li>
                 <form @submit.prevent="search" class="form-inline">
                     <input type="text" v-model="keyword" placeholder="Search..." class="input form-control p-10" size="70%" id="searchElement" aria-label="Search" required>
                     <button type="submit" value="Search" class="btn btn-outline-secondary" id="searchButtonElement">
                         <b-icon-search></b-icon-search>
                     </button>
                 </form>
             </li>
             <li>
                <select name="order" v-model="orderBy" @change="search">
                <option value="newest">newest</option>
                <option value="relevance">relevance</option>
                </select>
             </li>
          </ul>
       </b-collapse>
</b-navbar>



<br><br><br><br>
    <div class="content">
      <div class="loading" v-if="loadState == 'loading'"></div>
      <BookList v-if="loadState == 'success'" :books="books"/>
    </div>
      xxx
      <nav aria-label="Page navigation" style="margin-top: 10px" v-if="loadState == 'success'">
      <ul class="pagination justify-content-center">
          <li class="page-item" v-if="page > '1'"><button type="submit" value="Search" class="page-link" v-on:click="page--, search" @change="search">Previous</button></li>
          <li class="page-item" v-if="page < '20'"><button type="submit" value="Search" class="page-link" v-on:click="page++, search" @change="search">Next</button></li>
      </ul>
  </nav>
  

<br><br><br><br>
    <footer>
        <h3 id="about-us">About Us</h3>
        <p class="about_bawah">UntarBooks is a non-profit, free to access library, filled with a variety of books that you can read online. Feel free to read your favorite book, anywhere,anytime</p>
        <div class="text-center" id="quotestyle"> "The more that you read, the more things you will know. The more that you learn, the more places you'll go" - Dr.Seuss </div>
        <div class="text-center">© 2020 Copyright UntarBooks. All rights reserved.</div>
    </footer>
  </div>
  
</template>

<script>
import BookList from './components/BookList'
import axios from 'axios'
import { BIconBookHalf, BIconSearch } from 'bootstrap-vue'


export default {
  components: {
    BIconBookHalf,
    BIconSearch
  },
  data() {
    return {
      books: [],
      keyword: '',
      orderBy: 'newest',
      maxResults: '30',
      loadState: '',
      page:'1'
    }
  },
  methods: {
    search() {
      this.loadState = 'loading'
      axios
        .get(
          `https://www.googleapis.com/books/v1/volumes?q=intitle:${
            this.keyword
          }&startIndex=${(this.page-1)*30}&orderBy=${this.orderBy}&maxResults=${this.maxResults}`
        )
        .then(response => {
          console.log(response.data.items)
          this.books = response.data.items
          this.loadState = 'success'
        })
    }
  },
  components: {
    BookList
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');

body,
html {
  position: relative;
  font-family: 'Montserrat', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

a {
  color: #2c3e50;
  text-decoration: none;
}

.content {
  position: relative;
}

/* Loader: shamelessly taken from https://codepen.io/veganben/pen/GAgsH */
.loading {
  height: 0;
  width: 0;
  padding: 15px;
  border: 6px solid #ccc;
  border-right-color: #2c3e50;
  border-radius: 22px;
  -webkit-animation: rotate 1s infinite linear;
  position: absolute;
  left: 50%;
  top: 0;
}

@-webkit-keyframes rotate {
  /* 100% keyframe for  clockwise. 
     use 0% instead for anticlockwise */
  100% {
    -webkit-transform: rotate(360deg);
  }
}

.input {
  border: 1px solid #eee;

  height: 40px;
  padding: 0;
  margin: 0;
  padding-left: 15px;

  font-size: 18px;
}

.button {
  border: 0;
  padding: 0 10px;
  margin: 0;
  background: #2c3e50;
  color: white;
  box-shadow: 0 0 0 transparent;

  height: 40px;
  vertical-align: top;
}

select {
  display: inline-block;
  font-size: 16px;
  font-family: sans-serif;
  font-weight: 700;
  color: #2c3e50;
  line-height: 1.3;
  padding: 0.6em 1.4em 0.5em 0.8em;
  /* width: 100%; */
  max-width: 100%;
  box-sizing: border-box;
  margin: 0;
  border: 1px solid #aaa;
  box-shadow: 0 1px 0 1px rgba(1, 0, 0, 0.04);
  border-radius: 0.5em;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-color: #fff;
  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%232c3e50%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'),
    linear-gradient(to bottom, #ffffff 0%, #e5e5e5 100%);
  background-repeat: no-repeat, repeat;
  background-position: right 0.7em top 50%, 0 0;
  background-size: 0.65em auto, 100%;
  margin-left: 15px;
}
select::-ms-expand {
  display: none;
}
select:hover {
  border-color: #888;
}
select:focus {
  border-color: #aaa;
  box-shadow: 0 0 1px 3px rgba(59, 153, 252, 0.7);
  box-shadow: 0 0 0 3px -moz-mac-focusring;
  color: #222;
  outline: none;
}
select option {
  font-weight: normal;
}

.query {
  margin-bottom: 30px;
}

.book-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  grid-gap: 1rem;
}
.navbar {
    background: rgba(5, 5, 70, 0.8)!important;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}
.navbar-brand .text {
    color: #FFF;
    margin-left: 5px;
    font-weight: bold;
    font-size: calc(1vh+1vw);
}
.about_bawah{
    border-block-end-style: double;
    border-top: double;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    font-style: oblique;
    font-weight: 800;
    margin-block-start: 10px;
    margin-block-end: 20px;
    padding-top: 2pt;
}
#quotestyle{
    border-block-end-style: double;
    border-top: double;
    border-left: double;
    border-right: double;
    background-color: rgb(238, 195, 134);
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    font-style: italic;
    font-weight: 800;
    margin-block-start: 10px;
    margin-block-end: 20px;
    padding-top: 2pt;
}
</style>
