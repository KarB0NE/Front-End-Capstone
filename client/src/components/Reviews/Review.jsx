import React from 'react';
import axios from 'axios';
import AverageStarRating from './AverageStarRating.jsx';
import DisplayPicture from './DisplayPicture.jsx';

const { useState } = React;

function Review({ review }) {
  const [helpfulness, setHelpfulness] = useState(review.helpfulness);
  const [showModal, setShowModal] = useState(false);
  const [response, setResponse] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const imgOnClick = () => {
    toggleModal();
  };

  const date = new Date(review.date);
  const options = { year: 'numeric', month: 'long', day: '2-digit' };
  const formattedDate = date.toLocaleDateString('en-US', options);
  const helpfulClick = () => {
    if (!response) {
      setHelpfulness(helpfulness + 1);
      setResponse(true);
      axios.put('/reviews/:review_id/helpful', { id: review.review_id })
        .then((result) => {
          console.log('result is', result);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className="review-container">
      <div className="stars-user-date-container">
        <div className="stars-container"><AverageStarRating rating={review.rating} /></div>
        <div className="user-date">
          {review.reviewer_name}
          {',  '}
          {formattedDate}
        </div>
      </div>
      <div>
        <div>
          <b>{review.summary}</b>
        </div>
        <div>
          <p>{review.body}</p>
        </div>
        <div>

          { review.photos ? review.photos.map((photo) => <DisplayPicture imgUrl={photo.url} />) : ''}

        </div>
        {review.recommend ? (
          <div>

            <p className="check">
              I recommend this product
            </p>

          </div>
        ) : ''}
        {
          review.response ? (
            <div className="response">
              <p><b>Response from seller:</b></p>
              <p>{review.response}</p>
            </div>
          ) : ''
        }

        <div>
          <span>Helpful?</span>
          <span className="yes" onClick={helpfulClick}>
            {' '}
            <u>Yes</u>
          </span>
          <span>
            (
            {helpfulness}
            )
          </span>

          <span>
            {' '}
            {' '}
            {' '}
            |
            {' '}
            <u>Report</u>
          </span>
        </div>

        <div />
      </div>
      <br/>
      <hr />
    </div>
  );
}

export default Review;
