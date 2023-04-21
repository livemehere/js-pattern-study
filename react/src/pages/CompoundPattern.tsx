import styled from "styled-components";
import { FC } from "react";
import Layout from "../components/Layout";
import Select from "../components/compoundPattern/Select";

interface Props {}

const CompoundPattern: FC<Props> = () => {
  return (
    <Layout>
      <Root className="CompoundPattern">
        <h1>Compound Pattern</h1>
        <Select onChange={(v) => console.log(v)}>
          <Select.Option value="1">1</Select.Option>
          <Select.Option value="2">2</Select.Option>
          <Select.Option value="3">3</Select.Option>
        </Select>
      </Root>
    </Layout>
  );
};

export default CompoundPattern;

export const Root = styled.div``;
