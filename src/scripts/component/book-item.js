class BookItem extends HTMLElement {
  set book (book) {
    this._book = book
    this.render()
  }

  render () {
    this.innerHTML = `
        <div class="card" style="width:400px">
            <div class="card-body bg-secondary text-white border rounded">
              <img src="${this._book.volumeInfo.imageLinks.thumbnail} class="img-fluid"}
              <h3>${this._book.volumeInfo.title}</h3>
            </div>
        </div>
        `
  }
}

customElements.define('book-item', BookItem)
