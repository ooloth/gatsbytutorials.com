function Emoji({ emoji, ariaLabel, ...rest }: Props) {
  return (
    <Span role="img" aria-label={ariaLabel} {...rest}>
      {emoji}
    </Span>
  )
}

interface Props {
  emoji: string
  ariaLabel: string
  [key: string]: any
}

///////////////////////////////////////////////////////////////////////////////////

const Span = styled.span`
  flex: none;
  font-family: 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
`

///////////////////////////////////////////////////////////////////////////////////

import React from 'react'
import styled from 'styled-components'

export default Emoji
