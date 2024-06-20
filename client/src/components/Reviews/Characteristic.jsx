import React, { useState } from 'react';

function Characteristic({ feature, onclick }) {
  const [value, setValue] = useState(null);

  const changeHandler = (event) => {
    onclick(feature.id, event.target.value);
  };
  const levels = [];
  switch (feature.name) {
  case 'Size':
    levels[0] = 'A size too small';
    levels[1] = '1/2 a size too small';
    levels[2] = 'Perfect';
    levels[3] = '1/2 a size too big';
    levels[4] = 'A size too wide';
    break;
  case 'Width':
    levels[0] = 'Too narrow';
    levels[1] = 'Slightly narrow';
    levels[2] = 'Perfect';
    levels[3] = 'Slightly wide';
    levels[4] = 'Too wide';
    break;
  case 'Comfort':
    levels[0] = 'Uncomfortable';
    levels[1] = 'Slightly uncomfortable';
    levels[2] = 'Ok';
    levels[3] = 'Comfortable';
    levels[4] = 'Perfect';
    break;
  case 'Quality':
    levels[0] = 'Poor';
    levels[1] = 'Below average';
    levels[2] = 'What I expected';
    levels[3] = 'Pretty great';
    levels[4] = 'Perfect';
    break;
  case 'Length':
    levels[0] = 'Run Short';
    levels[1] = 'Run slightly short';
    levels[2] = 'Perfect';
    levels[3] = 'Runs slightly long';
    levels[4] = 'Run long';
    break;
  case 'Fit':
    levels[0] = 'Run tight';
    levels[1] = 'Run slightly tight';
    levels[2] = 'Perfect';
    levels[3] = 'Runs slightly long';
    levels[4] = 'Run long';
    break;
  default:
  }
  return (
    <div className="product-characteristic">
      <fieldset>
        <legend>{feature.name}</legend>
        <div className="radio-container">

          <label className="radio-btn">
            <input type="radio" key="1" name={`${feature.name.toLowerCase()}`} value="1" onChange={changeHandler} />
            {levels[0]}
          </label>

          <label className="radio-btn">
            <input type="radio" key="2" name={`${feature.name.toLowerCase()}`} value="2" onChange={changeHandler} />
            {levels[1]}
          </label>

          <label className="radio-btn">
            {' '}
            <input type="radio" key="3" name={`${feature.name.toLowerCase()}`} value="3" onChange={changeHandler} />
            {levels[2]}
          </label>

          <label className="radio-btn">
            <input type="radio" key="4" name={`${feature.name.toLowerCase()}`} value="4" onChange={changeHandler} />
            {levels[3]}
          </label>

          <label className="radio-btn">
            <input type="radio" key="5" name={`${feature.name.toLowerCase()}`} value="5" onChange={changeHandler} />
            {levels[4]}
          </label>
        </div>
      </fieldset>
    </div>
  );
}

export default Characteristic;
