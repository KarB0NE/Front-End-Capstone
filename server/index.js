require("dotenv").config();
const axios = require('axios');

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

app.get('/api/qa/questions', controllers.getQuestions);
app.get('/api/qa/questions/:question_id/answers', controllers.getAnswers);
app.post('/api/qa/:endpoint', controllers.postQuestionOrAnswer);
app.put('/api/qa/:endpoint/:id/helpful', controllers.markHelpful);
app.put('/api/qa/:endpoint/:id/report', controllers.reportQuestionOrAnswer);

app.listen(process.env.PORT);
console.log(`Server listening at http://localhost:${process.env.PORT}`);
