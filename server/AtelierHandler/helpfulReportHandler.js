const axios = require('axios');
const API_KEY = require('../config.js');
const baseURL = require('./AtelierConfig.js');

const questionHelpful = (req, res) => {
  const questionID = req.params.question_id;
  axios({
    method: 'put',
    url: `${baseURL}/qa/questions/${questionID}/helpful`,
    headers: { Authorization: API_KEY },
  })
    .then(() => res.end());
};

const answerHelpful = (req, res) => {
  const answerID = req.params.answer_id;
  axios({
    method: 'put',
    url: `${baseURL}/qa/answers/${answerID}/helpful`,
    headers: { Authorization: API_KEY },
  })
    .then(() => res.end());
};

const reviewHelpful = (req, res) => {
  const reviewID = req.params.review_id;
  axios({
    method: 'put',
    url: `${baseURL}/reviews/${reviewID}/helpful`,
    headers: { Authorization: API_KEY },
  })
    .then(() => res.end());
};

module.exports.questionHelpful = questionHelpful;
module.exports.answerHelpful = answerHelpful;
module.exports.reviewHelpful = reviewHelpful;
