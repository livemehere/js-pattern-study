import styled from 'styled-components'
import {FC, ReactNode} from 'react'

interface Props {
    children: NamedChildrenSlots | ReactNode;
}

type NamedChildrenSlots = {
    header?: ReactNode,
    body: ReactNode,
    footer?: ReactNode
}

const CardObjectChildren: FC<Props> = ({children}) => {
    if(isNamedSlots(children)){
        return <Root className="CardObjectChildren">
            {children.header && <div className="header">{children.header}</div>}
            {children.body && <div className="header">{children.body}</div>}
            {children.footer && <div className="header">{children.footer}</div>}
        </Root>
    }
    return <Root className="CardObjectChildren">{children}</Root>

}

export default CardObjectChildren

const isObject = <T extends object>(v: any): v is T => typeof v === 'object' && typeof v !== 'function' && typeof v !== 'undefined'
const isNamedSlots = (children:any): children is NamedChildrenSlots =>{
    return isObject(children) && 'body' in children;
}

export const Root = styled.div`
  padding: 20px;
  background: #ffffff50;
  margin: 10px 0;
`
