import {FC, useState} from "react";

interface Props {}

const App: FC<Props> = () => {
  const [list, setList] = useState([]);
  const handleClick = (e:any) => {
    setList(prev=> [...prev, Math.floor(Math.random()* 100)]);
  };

  return (
    <div className="App">
      <button onClick={handleClick}>click</button>
      <ul>
        {list.map((item, index) => (
            <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
