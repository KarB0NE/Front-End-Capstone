import Images from './Images.jsx';
import Info from './Info.jsx';
import Description from './Description.jsx';
import React from 'react';
import axios from 'axios';

function Overview( {id} ) {
  const [activeStyleIndex, setActiveStyleIndex] = React.useState(0);
  const handleStyleChange = function (newIndex) {
    setActiveStyleIndex(newIndex);
  }

  const [product, setProduct] = React.useState();
  const [reviewMetadata, setReviewMetadata] = React.useState();
  const [style, setStyle] = React.useState();
  React.useEffect(() => {
    axios({
      method: 'get',
      url: `/products/${id}`
    })
    .then((results) => {
      setProduct(results.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }, [])
  React.useEffect(() => {
    axios({
      method: 'get',
      url: `/reviews/meta/${id}`
    })
    .then((results) => {
      setReviewMetadata(results.data);
    })
    .catch((err) => {
      console.log(err);
    })
  }, []);
  React.useEffect(() => {
    axios({
      method: 'get',
      url: `/products/${id}/styles`
    })
    .then((results) => {
      setStyle(results.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);
  if (reviewMetadata && style && product){
    return (
      <div className="overview">
        <Images photoArray={style.results[activeStyleIndex].photos}/>
        <Info product={product} styleArray={style.results} reviewMetadata={reviewMetadata} handleStyleChange={handleStyleChange} activeStyleIndex={activeStyleIndex} />
        <Description slogan={product.slogan} description={product.description}/>
      </div>
    )
  } else {
    return <p>loading...</p>
  }
};

export default Overview;