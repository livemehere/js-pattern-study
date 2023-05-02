import { FC } from "react";

interface Props {}

const App: FC<Props> = () => {
  const handleClick = (e) => {
    console.log(e);
  };

  return (
    <div className="App">
      <button onClick={handleClick}>click</button>
    </div>
  );
};

export default App;
