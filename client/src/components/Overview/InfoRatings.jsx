
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';

function InfoRatings ( {reviewMetadata} ) {
  var average = 0;
  var counter = 0;
  for (var i = 1; i < 6; i++) {
    if (reviewMetadata.ratings[i]) {
      average += i * Number(reviewMetadata.ratings[i]);
      counter += Number(reviewMetadata.ratings[i]);
    }
  }
  if (counter) {
    average = average / counter;
    return (
      <div className="infoRatings">
        {
          ([1, 2, 3, 4, 5]).map((item) => {
            if (average > item) {
              return (<FontAwesomeIcon icon={faStar} />)
            } else {
              if (item - average <= 0.5) {
                return (<i className="fa-regular fa-star-half-stroke"></i>)
              } else {
                return (<i className="fa-regular fa-star"></i>)
              }
            }
          })
        }
        <p className="readAll">Read all {counter} reviews</p>
      </div>
    )
  }
};

export default InfoRatings;