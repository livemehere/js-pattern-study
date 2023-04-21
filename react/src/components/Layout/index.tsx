import styled from "styled-components";
import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <Root className="Layout">
      <nav>
        <ul>
          <li>
            <Link to={"/"}>HOME</Link>
          </li>
          <li>
            <Link to={"/ChildrenPatternPage"}>ChildrenPatternPage</Link>
          </li>
          <li>
            <Link to={"/CompoundPattern"}>CompoundPattern</Link>
          </li>
        </ul>
      </nav>
      <main>{children}</main>
    </Root>
  );
};

export default Layout;

export const Root = styled.div``;
