import styled from "styled-components";
import { FC } from "react";
import Card from "../components/childrenPattern/Card";
import CardObjectChildren from "../components/childrenPattern/CardObjectChildren";
import CardRenderProps from "../components/childrenPattern/CardRenderProps";
import Layout from "../components/Layout";

interface Props {}

const ChildrenPatternPage: FC<Props> = () => {
  return (
    <Layout>
      <h1>ChildrenPatterns</h1>
      {/* 1. 단순 ReactNode */}
      <Card>HI</Card>

      {/* 2. ReactNode 가 아니라 object 를 받음 */}
      <CardObjectChildren>
        {{
          header: <div>헤더</div>,
          body: <div>바디</div>,
          footer: <footer>푸터</footer>,
        }}
      </CardObjectChildren>

      {/* 3. ReactNode | 함수를 받음 */}
      <CardObjectChildren>hello</CardObjectChildren>
      <CardRenderProps onToggle={(v) => console.log(v)}>
        {({ toggle, on }) => <div onClick={toggle}>{on ? "ON" : "OFF"}</div>}
      </CardRenderProps>
    </Layout>
  );
};

export default ChildrenPatternPage;

export const Root = styled.div``;
