import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config.js';

const AddQuestionAnswerModal = ({ productId, onClose, onSubmit, isQuestion = true }) => {
  const [formData, setFormData] = useState({
    body: '',
    name: '',
    email: '',
    product_id: productId,
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const endpoint = isQuestion ? 'questions' : `questions/${question_id}/answers`;

    axios.post(`${API_URL}/qa/${endpoint}`, formData)
      .then(response => {
        onSubmit(response.data);
      })
      .catch(err => {
        console.error(`Error adding ${isQuestion ? 'question' : 'answer'}:`, err);
        setError('An error occurred. Please try again.');
      });
  };

  return (
    <div className="modal fixed top-0 left-0 right-0 bottom-0 bg-black opacity-70 z-[1000]">
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-[50px] z-[1000]">
      <form onSubmit={handleSubmit}>
        <label htmlFor="body">
          {isQuestion ? 'Ask Your Question' : 'Submit Your Answer'}
        </label>
        <textarea
          id="body"
          name="body"
          value={formData.body}
          onChange={handleChange}
          required
        />
        <label htmlFor="name">Username</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Example: jackson11!"
          required
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Example: jack@email.com"
          required
        />

        {/* Conditionally render photo input fields for answers only */}
        {/* {!isQuestion && (
          <>
          </>
        )} */}

        {error && <p className="error-message">{error}</p>}
        <button type="submit">Submit</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
      </div>
    </div>
  );
};

export default AddQuestionAnswerModal;