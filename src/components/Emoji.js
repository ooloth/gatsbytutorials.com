const Emoji = ({ emoji, ariaLabel, className = ``, style = {} }) => (
  <span
    role="img"
    aria-label={ariaLabel}
    className={`emoji ${className}`}
    style={style}
  >
    {emoji}
  </span>
)

Emoji.propTypes = {
  emoji: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.object
}

/*
 *
 * Imports & Exports
 *
 */

import React from 'react'
import PropTypes from 'prop-types'

export default Emoji

/*

INSTRUCTIONS:

<Emoji 
  emoji={emoji, required}
  ariaLabel={string, required}
  className={string, optional}
  style={string || object, optional}
/>

*/
