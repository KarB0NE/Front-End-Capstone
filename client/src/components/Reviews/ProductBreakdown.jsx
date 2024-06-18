import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CharacteristicsBar from './CharacteristicsBar.jsx';

function ProductBreakdown({ id }) {
  const [characteristics, setCharacteristics] = useState(null);

  const getReviewMeta = () => {
    axios.get('reviews/meta', { params: { product_id: id } })
      .then((results) => {
        setCharacteristics(results.data.characteristics);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getReviewMeta();
  }, []);
  return (
    <div className="product-breakdown-container">
      {
        characteristics && characteristics.Quality
          ? (
            <div className="characteristics-container">
              <div className="characteristic">Quality</div>
              <CharacteristicsBar value={characteristics.Quality.value} labels={['Poor', 'Ok', 'Perfect']} />
            </div>
          ) : ''
      }
      {
        characteristics && characteristics.Size
          ? (
            <div className="characteristics-container">
              <span>Size</span>
              <div className="characteristic">Size</div>
              <CharacteristicsBar value={2} labels={['Too small', 'Perfect', 'Too large']} />
            </div>
          ) : ''
      }
      {
        characteristics && characteristics.Width
          ? (
            <div className="characteristics-container">
              <div className="characteristic">Width</div>
              <CharacteristicsBar value={3} labels={['Too narrow', 'Ok', 'Too wide']} />
            </div>
          ) : ''
      }
      {
        characteristics && characteristics.Comfort
          ? (
            <div className="characteristics-container">
              <div className="characteristic">Comfort</div>
              <CharacteristicsBar value={4} labels={['Poor', 'Ok', 'Perfect']} />
            </div>
          ) : ''
      }
      {
        characteristics && characteristics.Length
          ? (
            <div className="characteristics-container">
              <div className="characteristic">Length</div>
              <CharacteristicsBar value={4} labels={['Short', 'Perfect', 'Long']} />
            </div>
          ) : ''
      }
      {
        characteristics && characteristics.Fit
          ? (
            <div className="characteristics-container">
              <div className="characteristic">Fit</div>
              <CharacteristicsBar value={4} labels={['Tight', 'Perfect', 'Long']} />
            </div>
          ) : ''
      }

    </div>

  );
}
export default ProductBreakdown;
