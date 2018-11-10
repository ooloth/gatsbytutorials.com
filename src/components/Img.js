function Img({ objFit = `cover`, objPosition = `50% 50%`, ...props }) {
  return (
    <Image
      {...props}
      imgStyle={{
        ...props.imgStyle,
        objectFit: objFit,
        objectPosition: objPosition,
        fontFamily: `"object-fit: ${objFit}; object-position: ${objPosition}"`
      }}
    />
  )
}

/*
 *
 * Imports & Exports
 *
 */

import React from 'react'
import Image from 'gatsby-image'

export default Img
