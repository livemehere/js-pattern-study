import styled from 'styled-components'
import {FC} from 'react'
import Card from "../components/childrenPattern/Card";
import CardObjectChildren from "../components/childrenPattern/CardObjectChildren";

interface Props {
}

const ChildrenPatternPage: FC<Props> = () => {
    return <Root className="childrenPatternPage">
        <Card>HI</Card>
        <CardObjectChildren>
            {{
                header: <div>헤더</div>,
                body: <div>바디</div>,
                footer: <footer>푸터</footer>
            }}
        </CardObjectChildren>
        <CardObjectChildren>
            hello
        </CardObjectChildren>
    </Root>
}

export default ChildrenPatternPage

export const Root = styled.div``
