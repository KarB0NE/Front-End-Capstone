
function InfoNameplate ( {name, category, price} ) {
  return (
    <div className="infoName">
      <p className="category">{category}</p>
      <h2 className="prodName">{name}</h2>
      <p className="prodPrice">${price}</p>
    </div>
  )
};

export default InfoNameplate;