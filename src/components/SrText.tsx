const SrText = styled.span<Props>`
  display: block;
  position: absolute;
  overflow: hidden;
  clip: rect(1px 1px 1px 1px);
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(1px);
  height: 1px;
  width: 1px;
  white-space: nowrap;
`

interface Props {
  children: ReactNode
  [key: string]: any
}

///////////////////////////////////////////////////////////////////////////////////

import { ReactNode } from 'react'
import styled from 'styled-components'

export default SrText

// See: https://css-tricks.com/small-tweaks-can-make-huge-impact-websites-accessibility/#article-header-id-5
