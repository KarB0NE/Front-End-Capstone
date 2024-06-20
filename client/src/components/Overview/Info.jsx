import InfoRatings from './InfoRatings.jsx';
import InfoNameplate from './InfoNameplate.jsx';
import InfoStyle from './InfoStyle.jsx';

function Info ( {product, reviewMetadata, styleArray, handleStyleChange, activeStyleIndex} ) {
  return (
    <div className="info">
      <InfoRatings reviewMetadata={reviewMetadata} />
      <InfoNameplate name={product.name} category={product.category} price={styleArray[activeStyleIndex].original_price} />
      <InfoStyle sku={styleArray[activeStyleIndex].skus}styles={styleArray} activeStyleIndex={activeStyleIndex} handleStyleChange={handleStyleChange} />
    </div>
  )
};

export default Info;