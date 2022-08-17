import Counter from "@/components/Count/Counter"
import * as React from 'react'

const countersLen = Array.from({ length: 6 }, (_, i) => i)

export default function Count() {
  return (
    <div
      style={{  
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "900px", 
        flexWrap: "wrap",
      }}
    >
      {countersLen.map((item, index) => (
         <Counter startingValue={index+ 0.6}/>
      ))}  
    </div> 
  );
}
