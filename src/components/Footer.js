const Footer = () => (
  <footer className="container bt b--black-10 pv4 lh-copy sans-serif">
    <p>
      Missing a tutorial?{' '}
      <Anchor
        href="https://github.com/ooloth/gatsby-tutorials#how-do-i-add-a-tutorial"
        className="link"
      >
        Add it to the directory
      </Anchor>
      .
    </p>
    <p className="pv3">
      Want to learn more about GatsbyJS? Check out the{' '}
      <Anchor href="https://www.gatsbyjs.org/tutorial/" className="link">
        official tutorial
      </Anchor>{' '}
      and{' '}
      <Anchor href="https://www.gatsbyjs.org/docs/" className="link">
        docs
      </Anchor>
      .
    </p>
    <p>
      Built by{` `}
      <Anchor href="https://www.michaeluloth.com" className="link">
        Michael Uloth
      </Anchor>
      .
    </p>
  </footer>
)

/*
 *
 * Imports & Exports
 *
 */

import React from 'react'

import Anchor from '../components/Anchor'
import Emoji from '../components/Emoji'

export default Footer
