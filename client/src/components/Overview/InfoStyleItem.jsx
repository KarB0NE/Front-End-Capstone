
function InfoStyleItem ( {handleSkuOnChange, style, index, handleStyleChange} ) {
  return (
    <img className="styleThumbnail" src={style.photos[0].thumbnail_url} onClick={() => {
      handleStyleChange(index);
      handleSkuOnChange(Object.keys(style.skus)[0]);
    }}></img>
  )
}

export default InfoStyleItem;