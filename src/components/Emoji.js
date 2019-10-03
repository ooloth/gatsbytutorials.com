function Emoji({ emoji, ariaLabel, ...props }) {
  return (
    <Span role="img" aria-label={ariaLabel} {...props}>
      {emoji}
    </Span>
  )
}

Emoji.propTypes = {
  emoji: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string.isRequired,
}

///////////////////////////////////////////////////////////////////////////////////

const Span = styled.span`
  flex: none;
  font-family: 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
`

///////////////////////////////////////////////////////////////////////////////////

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

export default Emoji
