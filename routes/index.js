const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

var page = 1;
var _title_page = "Novel Books";

router.get('/', 
    async (req, res) => {
      page = 1;
      console.log("Masuk index");
      fetch(`https://www.googleapis.com/books/v1/volumes?q=Novel&maxResults=30`)
      .then(response => response.json())
      .then(data => {
        //console.log(data.items[0].id);
        if (!data.items) {
          Promise.reject("Novel is not found");
        }
        else{
          var books = data.items;
          var renderbooks = '';

          books.forEach((element) => {
            var book_Item = '<div class="book-item">';
            book_Item = book_Item.concat(createBookItem(element)).concat('</div>');
            renderbooks = renderbooks.concat(book_Item);
          });
          var pageNav = getPageNav(data.totalItems);

          res.render('pages/index', { result:renderbooks, title_page:_title_page, page_nav:pageNav });
        }
      })
    }
);

router.get('/page/:num',
  async (req, res) => {
    page = req.params.num;
    console.log(`Masuk index > page ${page}`);
    fetch(`https://www.googleapis.com/books/v1/volumes?q=Novel&startIndex=${(page-1)*30}&maxResults=30`)
    .then(response => response.json())
    .then(data => {
      //console.log(data.items[0].id);
      if (!data.items) {
        Promise.reject("Novel is not found");
      }
      else{
        var books = data.items;
        var renderbooks = '';

        books.forEach((element) => {
          var book_Item = '<div class="book-item">';
          book_Item = book_Item.concat(createBookItem(element)).concat('</div>');
          renderbooks = renderbooks.concat(book_Item);
        });
        var pageNav = getPageNav(data.totalItems);

        res.render('pages/index', { result:renderbooks, title_page:_title_page, page_nav:pageNav });
      }
    })
  }
)

function getPageNav(totalItem) {
  var str = `
  <nav aria-label="Page navigation example" style="margin-top: 10px">
  <ul class="pagination justify-content-center">`;

  var navNum = 23;
  var pageStart = Number(page)-3;
  if (pageStart < 1) {
    pageStart = 1;
  } else if (pageStart > navNum-6) {
    pageStart = navNum-6;
  }
  var pageFinish = pageStart+5;
  

  if (page > 1)
    str = str.concat(`<li class="page-item"><a class="page-link" href="/page/${page-1}">Previous</a></li>`);

  if (page != 1)
    str = str.concat(`<li class="page-item"><a class="page-link" href="/page/1">1</a></li>`);
  else
    str = str.concat(`<li class="page-item"><a class="page-link btn-disabled" href="/page/1">1</a></li>`);

  if (pageStart > 1)
    str = str.concat(`<li class="page-item" disabled><a class="page-link">...</a></li>`);


  for(num = pageStart+1; num < pageFinish+1; num++) {
    if (page != num)
      str = str.concat(`<li class="page-item"><a class="page-link" href="/page/${num}">${num}</a></li>`);
    else
    str = str.concat(`<li class="page-item"><a class="page-link btn-disabled" href="/page/${num}">${num}</a></li>`);
  }

  if (pageFinish+1 < navNum)
    str = str.concat(`<li class="page-item" disabled><a class="page-link">...</a></li>`);
  
  if (page != navNum)
    str = str.concat(`<li class="page-item"><a class="page-link" href="/page/${Number(page)+1}">Next</a></li>`);

  str = str.concat("</ul></nav>");
  return str;
}

function createBookItem (book) {
  const _title = book.volumeInfo.title
  const _id = book.id

  var _img_src = ""
  var _author = ""
  var _date = ""
  var _desc = ""

  if (book.volumeInfo.imageLinks == undefined)
    _img_src = "../layouts/c6fed2636298a3e61afa136b131087cc.jpg"
  else
    _img_src = book.volumeInfo.imageLinks.thumbnail
  if (book.volumeInfo.authors == undefined)
    _author = "Unknown"
  else 
    _author = book.volumeInfo.authors[0]

  if (book.volumeInfo.publishedDate == undefined)
    _date = "Unknown"
  else
    _date = book.volumeInfo.publishedDate

  if (book.volumeInfo.description == undefined)
    _desc = "Unknown"
  else
    _desc = book.volumeInfo.description


  str = `
        <div class="card shadow" onclick="location.href='../detail/${_id}'">
          <div class="card-body">
            <div class="row">
              <div class="col">
                <img src="${_img_src}" class="card-img">
              </div>
              <div class="col">
                <h4 class="card-title">${_title}</a></h4>
                <hr>
                <p class="card-text">${_desc}</p>
              </div>
            </div>
            
            <div class="row">
              <h6 class="card-made">${_author} (${_date})</h6>
            </div>
            
          </div>
        </div>
      `;
  return str;
};
module.exports = router;