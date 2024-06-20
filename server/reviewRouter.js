require('dotenv').config();
const reviewRouter = require('express').Router();
const axios = require('axios');

reviewRouter.post('/reviews', (req, res) => {
  const url = `${process.env.BASE_URL}/reviews`;
  const options = {
    headers: { Authorization: process.env.X_API_KEY },
  };

  axios.post(url, req.body, options)
    .then((result) => {
      res.status(201).send(result.data);
    })
    .catch((err) => {
      res.send(err);
    });
});
reviewRouter.get('/reviews', (req, res) => {
  const url = `${process.env.BASE_URL}/reviews`;
  const options = {
    headers: { Authorization: process.env.X_API_KEY },
    params: {
      product_id: req.query.product_id,
      page: req.query.page,
      count: req.query.count,
      sort: req.query.sortTyoe,
    },
  };

  axios.get(url, options)
    .then((results) => {
      res.status(200).send(results.data.results);
    })
    .catch((err) => {
      res.send(err);
    });
});

reviewRouter.get('/products/:product_id', (req, res) => {
  const url = `${process.env.BASE_URL}/products/${req.query.pid}`;
  const options = {
    headers: { Authorization: process.env.X_API_KEY },
  };
  axios.get(url, options)
    .then((result) => {
      res.status(200).send(result.data);
    })
    .catch((err) => {
      res.send(err);
    });
});
reviewRouter.get('/reviews/meta', (req, res) => {
  const url = `${process.env.BASE_URL}/reviews/meta`;
  const options = {
    headers: { Authorization: process.env.X_API_KEY },
    params: { product_id: req.query.product_id },
  };
  axios.get(url, options)
    .then((results) => {
      res.status(200).send(results.data);
    })
    .catch((err) => {
      res.send(err);
    });
});

reviewRouter.put('/reviews/:review_id/helpful', (req, res) => {
  const url = `${process.env.BASE_URL}/reviews/${req.body.id}/helpful`;
  const options = {
    headers: { Authorization: process.env.X_API_KEY },
  };

  axios.put(url, {}, options)
    .then((result) => {
      res.status(204).send(result.data);
    })
    .catch((err) => {
      console.log(err);
      res.status(401).send(err);
    });
});

module.exports = reviewRouter;
