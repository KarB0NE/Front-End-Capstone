import InfoStyleItem from './InfoStyleItem.jsx';
import React from 'react';
import axios from 'axios';

function InfoStyle ( {sku, styles, activeStyleIndex, handleStyleChange} ) {
  var styleIndex = -1;
  const [selectedSku, setSelectedSku] = React.useState(Object.keys(sku)[0]);
  const handleSkuOnChange = function (newSku) {
    setSelectedSku(newSku);
  }
  const onChange = function (event) {
    var val = event.target.value;
    setSelectedSku(val);
  }
  var arrayToMap = [];
  if (sku[selectedSku]) {
    if (sku[selectedSku].quantity > 15) {
      for (var i = 1; i <= 15; i++) {
        arrayToMap.push(i);
      }
    } else {
      for (var i = 1; i <= sku[selectedSku].quantity; i++) {
        arrayToMap.push(i);
      }
    }
  }
  return (
    <div className="infoStyle">
    <p>Style: {styles[activeStyleIndex].name}</p>
      <div className="styleList">{
      styles.map((item) => {
        styleIndex++;
        return <InfoStyleItem handleSkuOnChange={handleSkuOnChange} style={styles[styleIndex]} index={styleIndex} handleStyleChange={handleStyleChange} />
      })}
      </div>
      <div className="addToCart">
        <select className="sizeForm" onChange={onChange}>
          {
            Object.keys(sku).map((item) => {
              return <option id={item} value={item}>{sku[item].size}</option>
            })
          }
        </select>
        <select className="quanForm" id="quanSelect">
          {
            arrayToMap.map((quan) => {
              return <option value={quan}>{quan}</option>
            })
          }
        </select>
        <button className="cartAddButton" onClick={() => {
          axios({
            method: 'post',
            url: '/cart',
            data: {
              sku_id: selectedSku,
              count: Number(document.getElementById('quanSelect').value)
            }
          })
          .then((results) => {
            console.log(results);
          })
          .catch((err) => {
            console.log(err);
          })
        }}>Add to Cart</button>
      </div>
    </div>
  )
}

export default InfoStyle;