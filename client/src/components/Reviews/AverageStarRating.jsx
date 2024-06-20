import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as SolidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';

function AverageStarRating({ rating }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      {
        [...Array(5)].map((star, i) => {
          const index = i + 1;
          let width;
          if (index < rating) {
            width = '100%';
          } else {
            const remainder = rating - i;
            if (remainder > 0.875) {
              width = '100%';
            } else if (remainder > 0.675 && remainder <= 0.875) {
              width = '65%';
            } else if (remainder > 0.375 && remainder <= 0.675) {
              width = '45%';
            } else if (remainder > 0.125 && remainder <= 0.375) {
              width = '25%';
            } else {
              width = '0';
            }
          }

          return (
            <div
              key={index}
              style={{
                position: 'relative',
                display: 'inline-block',
                width: '20px',
                height: '20px',
              }}
            >

              <FontAwesomeIcon icon={regularStar} color="lightgrey" />
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: `${width}`,
                  overflow: 'hidden',
                }}
              >
                <FontAwesomeIcon icon={SolidStar} color="#ffc107" />
              </div>
            </div>
          );
        })
      }
    </div>
  );
}

export default AverageStarRating;
