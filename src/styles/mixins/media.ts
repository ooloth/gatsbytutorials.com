const breakpoints = {
  sm: 36,
  md: 48,
  lg: 62,
  xl: 75,
} as Breakpoints

interface Breakpoints {
  [key: string]: number
}

export const media = Object.keys(breakpoints).reduce((queryObject: Object, screen) => {
  queryObject[screen] = (declarations: TemplateStringsArray) => {
    return `
    @media only screen and (min-width: ${breakpoints[screen]}em) {
      ${css(declarations)}
    }
    `
  }
  return queryObject
}, {}) as MediaQueries

interface MediaQueries {
  [key: string]: (declarations: TemplateStringsArray) => TemplateStringsArray
}

interface Object {
  [key: string]: object
}

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
