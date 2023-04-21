import styled from 'styled-components'
import {FC, ReactNode} from 'react'

interface Props {
    children:ReactNode
}

const Card: FC<Props> = ({children}) => {
    return <Root className="Card">{children}</Root>
}

export default Card

export const Root = styled.div`
  display: inline-block;
  padding: 20px;
  background: #ffffff50;
`
