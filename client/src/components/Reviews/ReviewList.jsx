/* eslint-disable no-console */
import React from 'react';
import axios from 'axios';
// eslint-disable-next-line import/extensions
import AverageStarRating from './AverageStarRating.jsx';
import Review from './Review.jsx';
import AddReivew from './AddReview.jsx';
import SearchBar from './SearchBar.jsx';

const { useEffect, useState } = React;
function ReviewList({ id, starFilter }) {
  const [totalReviews, setTotalReviews] = useState(0);
  const [sort, setSort] = useState('relevance');
  const [page, setPage] = useState(1);
  const [reviewList, setRiewList] = useState([]);
  const [isAddClicked, setAddClicked] = useState(false);
  const [filteredReviews, setFiltered] = useState([]);
  const [queryItem, setQueryItem] = useState('');

  const getTotalReviews = () => {
    console.log('id = ', id);
    axios.get('reviews/meta', { params: { product_id: id } })
      .then((results) => {
        let total = 0;
        // eslint-disable-next-line no-plusplus
        for (let i = 1; i <= 5; i++) {
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

  const getReviewList = (pageNo, countNo, sortText, reviews) => {
    console.log(sortText);
    axios.get('reviews', {
      params: {
        product_id: id, page: pageNo, sortType: sortText, count: countNo,
      },
    })
      .then((results) => {
        if (reviews !== []) {
          const newReviewList = reviews.concat(results.data);
          setRiewList(newReviewList);
        } else {
          setRiewList(results.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getTotalReviews();
    getReviewList(1, 2, sort, []);
  }, []);
  // eslint-disable-next-line func-names
  const onchange = function (e) {
    if (e.target.value !== sort) {
      console.log(e.target.value);
      setRiewList([]);
      setSort(e.target.value);
      getReviewList(1, 2, e.target.value, []);
    }
  };

  const handleMorebutton = () => {
    const pages = page + 1;
    setPage(pages);
    getReviewList(pages, 2, sort, reviewList);
  };
  const noReviews = reviewList.length === 0;

  function addReivewClick() {
    setAddClicked(!isAddClicked);
  }

  function closeAddReview() {
    setAddClicked(!isAddClicked);
  }

  return (
    <div className="reviews-container">
      <div>
        <SearchBar setQueryItem={setQueryItem} reviewList={reviewList} setFiltered={setFiltered} />
      </div>
      <div className="dropdown-container">
        <div>
          {' '}
          {' '}
          { totalReviews }
          {' '}
          {' '}
          reviews, sorted by
          {' '}

          <span>
            <select className="my-select" onChange={onchange}>
              <option value="relevance" selected>Relevance</option>
              <option value="helpful">Helpful</option>
              <option value="newest">Newest</option>
            </select>
          </span>
        </div>
      </div>
      {
        noReviews ? (
          <div className="single-button">
            <button className="buttons" type="button"> ADD A REVIEW + </button>
          </div>
        )
          : (
            <div className="reviews-btn-container">
              <div className="reviews">
                { queryItem.length < 3
                  ? reviewList.map((review) => (
                    starFilter.every((x) => x === false) || starFilter[review.rating - 1]
                      ? (
                        <div>
                          <Review review={review} />
                        </div>
                      ) : ''
                  ))
                  : filteredReviews.map((review) => (
                    starFilter.every((x) => x === false) || starFilter[review.rating - 1]
                      ? (
                        <div>
                          <Review review={review} />
                        </div>
                      ) : ''
                  ))}
              </div>
              <div className="btn-container">
                <div className="more-review-btn">
                  <button className="buttons" type="button" onClick={handleMorebutton}> MORE REVIEWS </button>
                </div>
                <div className="add-review-btn">
                  <button className="buttons" type="button" onClick={addReivewClick}> ADD A REVIEW + </button>
                </div>
              </div>
            </div>
          )
      }
      <div>
        {isAddClicked ? <AddReivew product_id={id} closeAddReview={closeAddReview} /> : ''}
      </div>
    </div>

  );
}

export default ReviewList;
