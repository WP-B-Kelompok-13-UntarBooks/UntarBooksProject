const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.get('/:Id', 
    async(req, res) => {
      var Id = req.params.Id;
      console.log("Masuk detail: " + Id);
      _title_page = "Novel Books";

      fetch(`https://www.googleapis.com/books/v1/volumes/${Id}`)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          Promise.reject(`${Id} is not found`)
        }
        else{
          var renderbook = data;
          res.render('pages/detail', { book:renderbook });
        }
      })

    }
);

module.exports = router;