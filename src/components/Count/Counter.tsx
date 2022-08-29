import React,  { useState } from 'react'
import './Counter.css';

type Props = {
  startingValue: number,
}

export default function Counter({startingValue}:  Props) {
    const [count, setCount] = useState<number>(startingValue)
    const handleClick = (type: string) => () => setCount(type === 'increase' ? count + 1 : count - 1)
    const shadow = {
        boxShadow: '0 0 10px 10px #eaeaea',
        padding: 20
    }

  return (
    <div className="container" style={shadow}>
      <div className="chevron chevron-up" 
        style={{
          visibility: count >= 10 && 'hidden'
        } as React.CSSProperties }
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
        } as React.CSSProperties }
        onClick={ handleClick('decrease')} />
    </div>
  )
}


