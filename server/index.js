require("dotenv").config();
const controller = require('./overviewController');
const axios = require('axios');
const reviewRouter = require('./reviewRouter.js');

const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.json());

const controllers = require('./controllers')

const instance = axios.create({
  baseURL: `https://app-hrsei-api.herokuapp.com/api/fec2/:${process.env.CAMPUS_CODE}/`,
  "X-API-Key": process.env.X_API_KEY
});

app.get('/api/qa/questions/', controllers.getQuestions);
app.get('/api/qa/questions/:question_id/answers', controllers.getAnswers);
app.post('/api/qa/questions', controllers.postQuestion);
app.post('/api/qa/questions/:question_id/answers', controllers.postAnswer);
app.put('/api/qa/:endpoint/:id/helpful', controllers.markHelpful);
app.put('/api/qa/:endpoint/:id/report', controllers.reportQuestionOrAnswer);
app.put('/api/qa/answers/:answer_id/report', controllers.reportQuestionOrAnswer)
app.get('/products/*/styles', controller.getStyles);
app.get('/products/*', controller.getProduct);
app.get('/reviews/meta/*', controller.getReviewData);
app.post('/cart', controller.postCart);

app.use('/', reviewRouter);


app.listen(process.env.PORT);
console.log(`Server listening at http://localhost:${process.env.PORT}`);