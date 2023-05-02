import {useState} from "react";

export default function Counter(){
    const [count, setCount] = useState(0);
    return <div>
        <h2>Counter</h2>
        <p>Count: {count}</p>
        <button onClick={()=>setCount(count+1)}>+</button>
        <button onClick={()=>setCount(count-1)}>-</button>
    </div>
}
