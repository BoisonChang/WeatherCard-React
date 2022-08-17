import React, {  useState } from "react";
import "./Converter.css";

const UnitControl = () => (
  <div className="unit-control">
    <div className="unit">Mbps</div>
    <span className="exchange-icon fa-fw fa-stack">
      <i className="far fa-circle fa-stack-2x" />
      <i className="fas fa-exchange-alt fa-stack-1x" />
    </span>
    <div className="unit">MB/s</div>
  </div>
)

type Props = {
  inputValue: number,
}

const CardFooter = ({inputValue}:  Props) => {
  let criteria : {title: string, backgroundColor: string} = {
    title: '---',
    backgroundColor: '#d3d8e2',
  }

  if (!inputValue) {
    criteria = {
      title: '---',
      backgroundColor: '#d3d8e2',
    };
  } else if (inputValue < 15) {
    criteria = {
      title: 'SLOW',
      backgroundColor: '#ee362d',
    };
  } else if (inputValue < 40) {
    criteria = {
      title: 'GOOD',
      backgroundColor: '#1b82f1',
    };
  } else if (inputValue >= 40) {
    criteria = {
      title: 'FAST',
      backgroundColor: '#13d569',
    };
  }

  return (
    <div
      className="card-footer"
      style={{
        backgroundColor: criteria.backgroundColor,
      }}
    >
      {criteria.title}
    </div>
  );
};

export default function SpeedConverter() {
  const [inputValue, setInputValue] = useState<any>(0)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)
  
  return (
    <>
      <div className="container">
        <div className="card-header">Network Speed Converter </div>
        <div className="card-body">
            <UnitControl />
          <div className="converter">
            <div className="flex-1">
              <div className="converter-title">Set</div>
              <input
                type="number"
                className="input-number"
                min="0"
                onChange={handleInputChange}
                value={inputValue}
              />
            </div>
            <span className="angle-icon fa-2x" style={{ marginTop: "30" }}>
              <i className="fas fa-angle-right"></i>
            </span>
            <div className="text-right flex-1">
              <div className="converter-title">Show</div>
              <input
                type="text"
                className="input-number text-right"
                disabled
                value={inputValue / 8}
              />
            </div>
          </div>
        </div>
        <CardFooter  inputValue={inputValue}/>
      </div>
    </>
  );
}
