import { React, useState } from 'react'
import './Counter.css';


export default function Counter(props) {
    const { startingValue } = props
    const [count, setCount] = useState(startingValue)
    const handleClick = (type) => () => {
        setCount(type === 'increase' ? count + 1 : count - 1);
    }
    const shadow = {
        boxShadow: '0 0 10px 10px #eaeaea',
        padding: 20
    }

  return (
    <div className="container" style={shadow}>
      <div className="chevron chevron-up" 
      style={{
        visibility: count >= 10 && 'hidden'
      }}
      onClick={ handleClick('increase')} />
      <div
        className="number"
        style={{
          color: "#FFE8E8",
          textShadow: "2px 2px #434a54",
        }}
      >
        { count === 9 ? '快達最大值' : count === 1 ?  '快達最小值' :  count }
      </div>
      <div className="chevron chevron-down" 
        style={{
            visibility: count <= 0 && 'hidden'
        }}
        onClick={ handleClick('decrease')} />
    </div>
  )
}


