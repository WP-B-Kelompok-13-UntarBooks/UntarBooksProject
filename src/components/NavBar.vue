<template>
<b-navbar toggleable="lg"  class="navbar fixed-top navbar-expand-md navbar-dark text-white">
       <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
       <b-collapse id="nav-collapse" is-nav>
          <ul class="navbar-nav mr-auto">
             <li class="navbar-brand nav-link">
                <b-icon-book-half></b-icon-book-half>
                <a class="text" href="/">Your Books Catalog</a>
             </li>
             <li>
                 <form class="form-inline w-80" id="searchForm">
                     <input class="form-control p-30" size="95%" type="search" placeholder="Search Books" id="searchElement" aria-label="Search" required>
                     <button class="btn btn-outline-secondary" @click="searchE">
                         <b-icon-search></b-icon-search>
                     </button>
                 </form>
             </li>
          </ul>
       </b-collapse>
</b-navbar>
</template>

<script>
import { BIconBookHalf, BIconSearch } from 'bootstrap-vue'

export default {
  data () {
    return {
      sessionStat: null
    }
  },
  components: {
    BIconBookHalf,
    BIconSearch
  },
  methods: {
    searchE () {
      var searchElement = document.getElementById('searchElement').value
      this.$router.replace({ name: 'Search', params: {keyword: searchElement} })
    },
    getSessionStat () {
      if (this.$session.exists()) {
        this.sessionStat = true
      } else {
        this.sessionStat = false
      }
    }
  },
  mounted () {
    this.getSessionStat()
  }
}
</script>

<style>
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
</style>
