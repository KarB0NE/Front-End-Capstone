/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable no-console */
import React from 'react';
import axios from 'axios';
// eslint-disable-next-line import/extensions
import AverageStarRating from './AverageStarRating.jsx';

const { useState, useEffect } = React;

function RatingReviewSummary({ id }) {
  const [totalReviews, setTotalReviews] = useState(0);

  // eslint-disable-next-line no-param-reassign
  id = 40433;
  const getTotalReviews = () => {
    axios.get('reviews/meta', { params: { product_id: id } })
      .then((results) => {
        let total = 0;
        for (let i = 1; i <= 5; i += 1) {
          if (results.data.ratings[i]) {
            total += parseInt(results.data.ratings[i], 10);
          }
        }
        setTotalReviews(total);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getTotalReviews();
  }, []);

  return (
    // eslint-disable-next-line react/jsx-no-comment-textnodes
    <div>
      <div>
        <AverageStarRating rating={4.8} id="rating" />
      </div>
      <div>
        <span>{totalReviews}</span>
      </div>
    </div>
  );
}

export default RatingReviewSummary;
