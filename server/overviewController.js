const axios = require('axios');
require("dotenv").config();

const options = {
  headers: {
   authorization: process.env.X_API_KEY,
  }
};

module.exports = {
  getProduct: (req, res) => {
    var id = '';
    for (var i = req.url.length - 1; i > 0; i--) {
      if (req.url.charAt(i) !== '/') {
        id = req.url.charAt(i) + id;
      } else {
        break;
      }
    }
    var url = process.env.BASE_URL + `/products/${id}`;
    axios.get(url, options)
    .then((results) => {
      res.status(200).send(results.data);
    })
    .catch((err) => {
      res.status(500).send(err);
    })
  },
  getStyles: (req, res) => {
    var id = '';
    for (var i = req.url.length - 8; i > 0; i--) {
      if (req.url.charAt(i) !== '/') {
        id = req.url.charAt(i) + id;
      } else {
        break;
      }
    }
    var url = process.env.BASE_URL + `/products/${id}/styles`;
    axios.get(url, options)
    .then((results2) => {
      res.status(200).send(results2.data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    })
  },
  getReviewData: (req, res) => {
    var id = '';
    for (var i = req.url.length - 1; i > 0; i--) {
      if (req.url.charAt(i) !== '/') {
        id = req.url.charAt(i) + id;
      } else {
        break;
      }
    }
    var url = process.env.BASE_URL + `/reviews/meta`;
    var revOptions = {
      headers: {
       authorization: process.env.X_API_KEY,
      },
      params: {
        product_id: id
      }
    };
    axios.get(url, revOptions)
    .then((results3) => {
      res.status(200).send(results3.data);
    })
    .catch((err) => {
      console.log(err);
      console.log(id);
      res.status(500).send(err);
    })
  },
  postCart: (req, res) => {
    axios.post(`${process.env.BASE_URL}/cart`, req.body, options)
    .then((result) => {
      res.status(201).send('Succesfully Posted');
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    })
  }
}