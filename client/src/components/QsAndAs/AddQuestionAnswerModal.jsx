import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config.js';

const AddQuestionAnswerModal = ({ productId, onClose, question_id, isQuestion = true, fetchQuestions }) => {
  const [formData, setFormData] = useState({
    body: '',
    name: '',
    email: '',
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const endpoint = isQuestion ? 'questions' : `questions/${question_id}/answers`;
    console.log({formData})
    let submissionData = {}
    if (isQuestion) {
      submissionData = {
        ...formData,
        product_id: Number(productId)
      }
    } else {
      submissionData = {
      ...formData
      }
    }
    axios.post(`${API_URL}/${endpoint}`, submissionData)
      .then(response => {
        fetchQuestions();
        onClose();
      })
      .catch(err => {
        console.error(`Error adding ${isQuestion ? 'question' : 'answer'}:`, err);
        setError('An error occurred. Please try again.');
      });
  };

  return (
    <div className="modal fixed top-0 left-0 right-0 bottom-0 bg-black opacity-80 z-[1000]">
      <div className="flex flex-col fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-300 p-[50px] z-[1001]">
      <form onSubmit={handleSubmit}>
        <div>
        <label className="font-bold flex" htmlFor="body">
          {isQuestion ? 'Question: ' : 'Answer: '}
        </label>
        <textarea
          className="border border-black w-full h-32"
          id="body"
          name="body"
          value={formData.body}
          onChange={handleChange}
          required
        />
        </div>
        <div>
        <label className="font-bold" htmlFor="name">Username: </label>
        <input
          className="mb-1 border border-black w-full"
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Example: AlaskanHusky99"
          required
        />
         </div>
         <div>
        <label className="font-bold" htmlFor="email">Email: </label>
        <input
          className="border border-black w-full"
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Example: milkbone@email.com"
          required
          />
          </div>

        {/* Conditionally render photo input fields for answers only */}
        {/* {!isQuestion && (
          <>
          </>
        )} */}

        {error && <p className="error-message">{error}</p>}
        <button className="m-1 border border-black p-1 bg-white" type="submit">Submit</button>
        <button className="m-1 border border-black p-1 bg-white" type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
      </div>
    </div>
  );
};

export default AddQuestionAnswerModal;