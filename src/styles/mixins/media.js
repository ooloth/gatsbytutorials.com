const breakpoints = {
  sm: 36,
  md: 48,
  lg: 62,
  xl: 75,
}

// Iterate through the sizes and create a media template
// See: https://www.styled-components.com/docs/advanced#media-templates
export const media = Object.keys(breakpoints).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media only screen and (min-width: ${breakpoints[label]}em) {
      ${css(...args)}
    }
  `

  return acc
}, {})

///////////////////////////////////////////////////////////////////////////////////

import { css } from 'styled-components'

/*

USAGE:
=====

${media.xl`
  padding-left: var(--s8);
  padding-right: var(--s8);
`}

*/
