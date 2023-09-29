import styled from "styled-components";
import React, { useState, useEffect, useRef } from 'react';

const Container = styled.div`
  position: relative;
`;
const SmallTextLine = styled.span`
  display: block;             // This ensures that it occupies its own line.
  font-size: 14px;            // A small font size. Adjust as needed.
  line-height: 1;             // This ensures minimal spacing between top and bottom.
  padding-top: 2px;           // Small space on top.
  padding-bottom: 2px;        // Small space on bottom.
  white-space: nowrap;        // This ensures the text stays on a single line.
`;
const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1;
  background: white;
  border: 1px solid #ccc;
  cursor:pointer;
`;

const RadioWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const RadioColumn = styled.div`
  margin-right: 15px;
  display: flex;
  align-items: center;

  input[type="radio"] {
    margin-right: 5px;
  }
`;


export const Home = () => {
  const materials = {
    'EKDXZIKOKQ28KD': { name: 'ガラス', value: 2.5 },
    'IEKLZOLEP39CI3D': { name: '水', value: 80 },
    'PLOUEKKLOX': { name: '紙', value: 2.0 },
  };

  const containerRefs = useRef([]);
  const [inputValues, setInputValues] = useState(['', '', '']);
  const [openDropdowns, setOpenDropdowns] = useState([false, false, false]);
  const [ValidInputlog,setValidInputLog]=useState([]);
  const [radioIndex, setRadioIndex] = useState(0);

  const handleInputChange = (index, e) => {
      const value = e.target.value;
      setInputValues(prev => {
        const newValues = [...prev];
        newValues[index] = value;
        return newValues;
      });
    };
    const getDisplayValue = (inputValue) => {
      if (materials[inputValue]) {
        return `${materials[inputValue].value}ε0(${materials[inputValue].name})`
      }
      return inputValue;
    };
  const handleBackspace = (index, e) => {
    
    if (materials[inputValues[index]]) {
      setInputValues(prev => {
        const newValues = [...prev];
        newValues[index] = '';
        return newValues;
      });
    }
  };

  const handleSelectionChange = (index, material_id) => {
    setInputValues(prev => {
      const newValues = [...prev];
      newValues[index] = material_id;
      return newValues;
    });
    setOpenDropdowns(prev => {
      const newDropdowns = [...prev];
      newDropdowns[index] = false;
      return newDropdowns;
    });
  };

  const toggleDropdown = (index) => {
    setOpenDropdowns(prev => prev.map((isOpen, idx) => idx === index ? !isOpen : false));
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!containerRefs.current.some(ref => ref.contains(event.target))) {
        setOpenDropdowns(prev => prev.map(() => false));
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);
  const getMaterialValueById = (id) => {
    if (materials[id] && materials[id]!=='') {
      return `${materials[id].value}ε0(${materials[id].name})`;
    }
    let t=isValidNumber(id);
    if(t!==true){
      return "無効な値";
    }else{
    return id+" ε0";
    }
  };
  const handleKeyDown = (e) => {
    // Here we're checking if the key is NOT one of the allowed characters/keys
    if (!/^[0-9.]$/.test(e.key) && e.key !== "Backspace" && e.key !== "ArrowRight" && e.key !== "ArrowLeft" && e.key !== "Tab") {
        e.preventDefault();
    }
  }
  function isValidNumber(input) {
    let str = String(input);  // Convert the input to a string
    if (!str.length) {
      return "未入力です";
    }
    if (/e/i.test(str)) {
      return "指数表記は無効です"; // "Scientific notation is invalid"
    }
    // Check for any character that's not 0-9 or .
    if (/[^0-9.]/.test(str)) {
        return "数字と.以外入力禁止です";
    }
    // Check for more than one period
    if ((str.match(/\./g) || []).length > 1) {
        return ".が二つ以上あります";
    }
    // Check for strings starting with "0" followed by another number without a decimal
    if (str.startsWith('0') && str.length > 1 && str[1] !== '.') {
        return "0の後は.のみ入力可能です";
    }
    // Check for strings starting with "."
    if (str.startsWith('.')) {
        return "数字がない小数点は無効です";
    }
    // Check if string ends with a period or with a 0 after a period
    if (str.endsWith('.') || /0+$/.test(str.split('.')[1] || '')) {
        return "小数点以下の0で終了する値は無効です";
    }
    
    function countSignificantFigures(str) {
      // If there's a decimal, remove leading zeros and replace the dot
      if (str.includes('.')) {
          str = str.replace(/^0+/, '').replace('.', '');
      } else {
          // If no decimal, remove leading and trailing zeros
          str = str.replace(/^0+|0+$/g, '');
      }
      return str.length;
    }
    const totalSignificantFigures = countSignificantFigures(str);
  
    if (totalSignificantFigures > 6) {
      return "有効桁数は６桁までです";
    }
    let digitlenCount = str.length;
    if (digitlenCount >= 8) {
      return "表示桁数が長すぎます";
    }
    var v = parseFloat(str);
    if (v >= 1000) {
      return "値が大きすぎます";
    }
    if (v < 0.001) {
      return "値が小さすぎます";
    }
    return true;
}
  function Checker() {
    let errors = [];

    inputValues.forEach(value => {
      if (!materials[value]) {
          let t = isValidNumber(value);
          if (t !== true) {
              errors.push(t);
          }
      }
  });
  
  setValidInputLog(errors);
}
  return (
    <div className="App">
      {inputValues.map((inputValue, index) => (
        <Container key={index} ref={el => containerRefs.current[index] = el}>
          <input
            type="text"
            value={getDisplayValue(inputValue)}
            onClick={() => toggleDropdown(index)}
            onChange={(e) => handleInputChange(index, e)}
            onKeyDown={(e) =>{
              handleBackspace(index, e);
              handleKeyDown(e);
            }}
          />
          {openDropdowns[index] && (
            <Dropdown>
              {Object.entries(materials).map(([id, material]) => (
                <SmallTextLine
                  key={id}
                  onClick={() => handleSelectionChange(index, id)}
                >
                  {material.name ? `${material.name} (${material.value} ε0)` : '選択してください'}
                </SmallTextLine>
              ))}
            </Dropdown>
          )}
        </Container>
      ))}
      {ValidInputlog.map((error, index) => (
        <p key={index}>{error}</p>
      ))}
      <RadioWrapper>
        {inputValues.map((_, index) => (
          <RadioColumn key={index}>
            <input
              type="radio"
              name="inputValueRadio"
              value={index}
              checked={radioIndex === index}
              onChange={() => setRadioIndex(index)}
            />
            {`Option ${index + 1}`}
          </RadioColumn>
        ))}
      </RadioWrapper>
      <button onClick={() => Checker()}>Show inputValues</button>
      <div>
        {inputValues.map((inputValue, index) => (
          <p key={index}>
            {getMaterialValueById(inputValue) !== null ? `${getMaterialValueById(inputValue)}` : 'Not found'}
          </p>
        ))}
      </div>
    </div>
  );
};