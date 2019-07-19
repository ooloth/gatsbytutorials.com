export const onInitialClientRender = () => {
  // A11Y: Detect keyboard vs. mouse vs. touch input (for focus styling)
  if (!loadjs.isDefined(`what-input`)) {
    loadjs(
      `https://cdnjs.cloudflare.com/ajax/libs/what-input/5.0.5/what-input.min.js`,
      `what-input`
    )
  }
}

///////////////////////////////////////////////////////////////////////////////////

import loadjs from 'loadjs'
