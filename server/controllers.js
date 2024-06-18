const axios = require('axios');

const apiInstance = axios.create({
  baseURL: `https://app-hrsei-api.herokuapp.com/api/fec2/${process.env.CAMPUS_CODE}/`,
  headers: { "Authorization": process.env.X_API_KEY }
});

// Get questions for a product
const getQuestions = async (req, res) => {
    try {
        const { product_id } = req.query;
        const response = await apiInstance.get(`qa/questions?product_id=${product_id}`);
        res.json(response.data);
        console.log(response.data);
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ error: 'Failed to fetch questions' });
    }
};

// Get answers for a question
const getAnswers = async (req, res) => {
    try {
        const { question_id } = req.params;
        const response = await apiInstance.get(`qa/questions/${question_id}/answers`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching answers:', error);
        res.status(500).json({ error: 'Failed to fetch answers' });
    }
};

// POST a new question or answer
const postQuestionOrAnswer = async (req, res) => {
    try {
        const { endpoint } = req.params;
        const response = await apiInstance.post(`qa/${endpoint}`, req.body);
        res.status(201).json(response.data);
    } catch (error) {
        console.error(`Error posting ${endpoint}:`, error);
        res.status(500).json({ error: `Failed to post ${endpoint}` });
    }
};

// PUT to mark a question or answer as helpful
const markHelpful = async (req, res) => {
    try {
        const { endpoint, id } = req.params;
        await apiInstance.put(`qa/${endpoint}/${id}/helpful`);
        res.json(204);
    } catch (error) {
        console.error(`Error marking ${endpoint} as helpful:`, error);
        res.status(500).json({ error: `Failed to mark ${endpoint} as helpful` });
    }
};

// PUT to report a question or answer
const reportQuestionOrAnswer = async (req, res) => {
    try {
        const { endpoint, id } = req.params;
        await apiInstance.put(`qa/${endpoint}/${id}/report`);
        res.sendStatus(204);
    } catch (error) {
        console.error(`Error reporting ${endpoint}:`, error);
        res.status(500).json({ error: `Failed to report ${endpoint}` });
    }
};

module.exports = {
    getQuestions,
    getAnswers,
    postQuestionOrAnswer,
    markHelpful,
    reportQuestionOrAnswer
};