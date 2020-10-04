class BookItem extends HTMLElement {
  set book (book) {
    this._book = book
    this.render()
  }

  render () {
    this.innerHTML = `
        <div class="card">
          <div class="card-body bg-secondary text-white border rounded">
            <div class="row">
              <div class="col">
                <img src="${this._book.volumeInfo.imageLinks.thumbnail}" class="img-fluid">
              </div>
              <div class="col">
                <h4>${this._book.volumeInfo.title}</h4>
              </div>
            </div>
          </div>
        </div>
        `
  }
}

customElements.define('book-item', BookItem)
