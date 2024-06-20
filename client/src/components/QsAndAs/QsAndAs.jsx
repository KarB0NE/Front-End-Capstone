import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {API_URL} from '../config.js'
import QaSearchBar from './QaSearchBar.jsx';
import QaList from './QaList.jsx';

const QsAndAs = ({product_id}) =>  {

  const [itemQsAndAs, setItemQsAndAs] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchQuestions = () => {
  axios.get(`${API_URL}/questions`, {
    params: {product_id, count: 20}
  })
    .then(res => {
      setItemQsAndAs(res.data);
    })
    .catch(err => {
      console.error('Error fetching questions and answers: ', err);
      setError('An error occurred while fetching questions and answers.')
    })
    .finally(() => {
      setIsLoading(false);
    });
  }

  useEffect(() => {
      if (product_id) {
        fetchQuestions();
    }
  }, [product_id]);

const handleQuestionHelpfulClick = (question_id) => {
  axios.put(`${API_URL}/questions/${question_id}/helpful`)
  .then(() => {
    fetchQuestions();
    })
    .catch(error => {
      console.error('Error marking question as helpful:', error);
    })
};

const handleAnswerHelpfulClick = (question_id, answerId) => {
  axios.put(`${API_URL}/answers/${answerId}/helpful`)
    .then(() => {
      fetchQuestions();
    })
    .catch(error => {
      console.error('Error marking answer as helpful:', error);
    });
};

const handleAnswerReport = (questionId, answerId) => {
 axios.put(`${API_URL}/answers/${answerId}/report`)
  .then(() => {
    fetchQuestions();
  })
  .catch(error => {
    console.error('Error reporting answer:', error);
  });
};

return (
<>
  <div>
    <div className="bg-slate-300 container mx-auto p-4">
  <h2 className="mb-4 text-gray-800 text-lg text-left">Questions & Answers</h2>
  <h4 className="mb-4">{`Hardcoded Product ID: ${product_id}`}</h4>
  <QaSearchBar  onSearch={(term) => setSearchTerm(term)} />
  {isLoading ? (
        <p>Loading Q&A...</p> // Show loading message while isLoading is true
      ) : error ? (
        <p>{error}</p> // Show error message if there was an error
      ) : (
  <QaList
    itemQsAndAs={itemQsAndAs}
    searchTerm={searchTerm}
    handleQuestionHelpfulClick={handleQuestionHelpfulClick}
    handleAnswerHelpfulClick={handleAnswerHelpfulClick}
    handleAnswerReport={handleAnswerReport}
    setItemQsAndAs={setItemQsAndAs}
    fetchQuestions={fetchQuestions}
    />
      )}
      </div>
  </div>
</>
);
};

export default QsAndAs;