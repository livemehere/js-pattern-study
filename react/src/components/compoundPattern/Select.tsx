import styled from "styled-components";
import { createContext, FC, ReactNode, useContext, useState } from "react";

interface Props {
  children: ReactNode;
}

const selectContext = createContext({});

const Select = ({ children }: Props) => {
  const [selected, setSelected] = useState(null);
  return (
    <selectContext.Provider value={{ selected, setSelected }}>
      <Root className="Select">
        <div className="current">{selected ? selected : "SELECT"}</div>
        <div>{children}</div>
      </Root>
    </selectContext.Provider>
  );
};

interface OptionProps {
  value: string | number;
  children: ReactNode;
}

const Option = ({ value, children }: OptionProps) => {
  const { setSelected } = useContext(selectContext);
  return (
    <div className="Option" onClick={() => setSelected(value)}>
      {children}
    </div>
  );
};

const Root = styled.div`
  .current {
    background: #ffffff80;
    padding: 10px;
  }

  .Option {
    background: #ffffff50;
    padding: 10px;
    margin: 10px 0;
  }
`;

Select.Option = Option;
export default Select;
