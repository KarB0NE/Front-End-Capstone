import React from 'react';
import axios from 'axios';
import StarRate from './StarRate.jsx';
import UploadPhoto from './UploadPhoto.jsx';
import Characteristic from './Characteristic.jsx';

const { useState, useEffect } = React;

function AddReview({ product_id, created, closeAddReview }) {
  const [showModal, setShowModal] = useState(true);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(null);
  const [recommend, setRecommend] = useState(true);
  const [summary, setSummary] = useState('');
  const [email, setEmail] = useState(null);
  const [body, setBody] = useState('');
  const [bodyCharsLen, setBodyCharsLen] = useState(null);

  const [nickname, setNickname] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [charsIdValue, setCharsIdValue] = useState({});
  const [charsNameId, setCharsNameId] = useState([]);

  const getProduct = (id) => {
    axios.get('/products/:product_id', { params: { pid: id } })
      .then((result) => {
        setName(result.data.name);
      })
      .catch((err) => {
        console.log(err);
      });
    axios.get('reviews/meta', { params: { product_id: id } })
      .then((results) => {
        const keys = Object.keys(results.data.characteristics);
        const newChars = keys.map((key) => (
          { name: key, id: results.data.characteristics[key].id }));
        setCharsNameId(newChars);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  if (!showModal) {
    return ('');
  }
  const clickClose = () => {
    setShowModal(!showModal);
    closeAddReview();
  };

  const setStarRating = (stars) => {
    setRating(stars);
  };

  const recommendClick = (e) => {
    setRecommend(e.target.value === true);
  };

  const characteristicOnClick = (key, value) => {
    const newCharteristics = { ...charsIdValue };
    newCharteristics[key.toString()] = parseInt(value, 10);
    setCharsIdValue(newCharteristics);
  };

  const summaryChange = (e) => {
    setSummary(e.target.value);
  };

  const bodyChange = (e) => {
    setBody(e.target.value);
    setBodyCharsLen(e.target.value.length);
  };

  const nicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const emailChange = (e) => {
    setEmail(e.target.value);
  };
  function isValidEmail(email) {
    const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return regex.test(email);
  }
  const submitHandler = () => {
    const messages = ['You must enter the following'];
    const data = {};
    data.product_id = product_id;
    if (rating) {
      data.rating = rating;
    } else {
      messages.push('Overall Rating');
    }
    if (Object.keys(charsIdValue).length > 0) {
      data.characteristics = { ...charsIdValue };
    } else {
      messages.push('Characteristics');
    }
    if (body && bodyCharsLen >= 50) {
      data.body = body;
    } else {
      messages.push('Review Body');
    }
    if (nickname) {
      data.name = nickname;
    } else {
      messages.push('Nickname');
    }
    if (email && isValidEmail(email)) {
      data.email = email;
    } else {
      messages.push('Email');
    }
    data.summary = summary;

    data.recommend = recommend;
    data.photos = photos;
    if (messages.length > 1) {
      alert(messages.join('\n'));
    } else {
      axios.post('/reviews', data)
        .then((result) => {
          closeAddReview();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    getProduct(product_id);
  }, []);
  if (created) {
    return null;
  }
  return (
    <div className="add-review">
      <span className="close" onClick={clickClose}>&times;</span>
      <form className="review-content">
        <div>
          <h2>Write Your Review</h2>
          <p>
            About
            <b>{` ${name}`}</b>
          </p>

        </div>
        <div>
          <h3>Overall rating (mandatory)</h3>
          <div className="star-rating">
            <p>
              {' '}
              <StarRate setStarRating={setStarRating} />
              {' '}
            </p>
          </div>

        </div>
        <div className="recommend-container">
          <h3>Do you commmend this product? (mandatory)</h3>
          <div>
            <input type="radio" id="yes" name="recommend" value="true" onClick={recommendClick} defaultChecked />
            <label htmlFor="yes">Yes</label>

            <input type="radio" id="no" name="recommend" value="false" onClick={recommendClick} />
            <label htmlFor="no">No</label>
          </div>
        </div>
        <div className="characteristcs">
          <h3>characteristcis</h3>
          {
            charsNameId.map((item) => (
              <Characteristic
                feature={item}
                onclick={characteristicOnClick}
              />

            ))
          }
        </div>
        <div>
          <h3>Review Summary</h3>
          <div className="review-summary">
            <input className="summary-input" type="text" value={summary} onChange={summaryChange} maxLength={60} placeholder="Example: Best purchase ever!" />
          </div>

        </div>
        <div className="review-body">
          <h3>Review Body</h3>
          <textarea rows="7" className="body-input" value={body} onChange={bodyChange} minLength={50} maxLength={1000} placeholder="Why did you like the product or not?" />
          <div>
            <span>{ bodyCharsLen < 50 ? `Minimum required characters left: [${50 - bodyCharsLen}]` : 'Minimum reached'}</span>
          </div>
        </div>
        <div className="upload-photos">
          <h3>Upload photos</h3>
          <UploadPhoto setPhotos={setPhotos} />
          <div className="uploaded-file" id="fileName" />
        </div>
        <div className="nickname">
          <h3>What is your nickname (mandatory)</h3>
          <input className="nickname-input" type="text" value={nickname} onChange={nicknameChange} placeholder="Example: jackson11!" maxLength={60} />
          <p><i>**For privacy reasons, do not use your full name or email address</i></p>
        </div>
        <div className="email">
          <h3>Your email (mandatory)</h3>
          <input className="email-input" type="text" value={email} onChange={emailChange} placeholder="Example: jackson11@email.com" maxLength={60} />
          <p><i>**For authentication reasons, you will not be emailed</i></p>
        </div>
        <div>
          <button className="submit-button" type="button" onClick={submitHandler}>Submit</button>
        </div>

      </form>
    </div>
  );
}
export default AddReview;
