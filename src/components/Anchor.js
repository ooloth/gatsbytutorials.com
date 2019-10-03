function Anchor({ href, srText, children, ...props }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {srText && <SrText>{srText}</SrText>}
      {children}
    </a>
  )
}

Anchor.propTypes = {
  href: PropTypes.string.isRequired,
  srText: PropTypes.string, // if anchor has no visible text
  children: PropTypes.node,
}

///////////////////////////////////////////////////////////////////////////////////

import React from 'react'
import PropTypes from 'prop-types'

import SrText from './SrText'

export default Anchor
