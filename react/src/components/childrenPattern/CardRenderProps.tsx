import styled from "styled-components";
import { FC, ReactNode, useState } from "react";

interface Props {
  onToggle: (on: boolean) => void;
  children: (api: API) => ReactNode;
}

type API = { toggle: () => void; on: boolean };

const CardRenderProps: FC<Props> = ({ children, onToggle }) => {
  const [on, setOn] = useState(false);

  const toggle = () => {
    const v = !on;
    setOn(v);
    onToggle(v);
  };

  const api: API = {
    toggle,
    on,
  };

  if (!isFunction(children)) {
    throw new Error("children 은 함수여야 합니다.");
  }

  return <Root className="CardRenderProps">{children(api)}</Root>;
};

export default CardRenderProps;

const isFunction = (v: any): v is Function => typeof v === "function";

export const Root = styled.div`
  > * {
    display: inline-block;
    cursor: pointer;
    background: #ffffff50;
    padding: 20px;
  }
`;
