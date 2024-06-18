import React, { useState } from 'react';
import RatingBreakdown from './RatingBreakdown.jsx';
import ReviewList from './ReviewList.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';

function RatingAndReviews({ id }) {
  const [productId, setProductId] = useState(id);
  const [starFilter, setStarFilter] = useState([false, false, false, false, false]);

  const changeStarFilter = (index) => {
    const newFilter = [...starFilter];
    newFilter[index - 1] = !starFilter[index - 1];
    setStarFilter(newFilter);
  };

  return (
    <div className="rating-and-reviews">
      <h3>RATING & REVIEWS</h3>
      <div className="rating-reviews-container">
        <div className="breakdown">
          <div className="rating-breakdown-container">
            <RatingBreakdown id={id} starClickHandler={changeStarFilter} />
          </div>
          <div className="product-breakdown-container">
            <ProductBreakdown id={id} />
          </div>
        </div>
        <div className="reviewlist-container">
          <ReviewList id={id} starFilter={starFilter} />
        </div>
      </div>
    </div>
  );
}
export default RatingAndReviews;
