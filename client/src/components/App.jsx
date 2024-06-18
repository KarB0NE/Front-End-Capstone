import Overview from './Overview/Overview.jsx';
import RatingAndReviews from './Reviews/RatingAndReviews.jsx';

var App = function () {
  return (
    <div>
      <Overview id="40466"/>;
      <RatingAndReviews id={40466} />
    </div>
  )
}

export default App;