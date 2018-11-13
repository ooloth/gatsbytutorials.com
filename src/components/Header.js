const Header = ({ icon, count }) => (
  <header className="container pv4 sans-serif">
    <div className="flex items-center" style={{ maxWidth: `32rem` }}>
      <Img
        fluid={icon.childImageSharp.fluid}
        alt="GatsbyJS logo, consisting of a white 'G' on a purple circle"
        className="flex-none w3"
      />

      <h1 className="pl3 lh-copy f5 fw4">
        <span className="fw7">Gatsby Tutorials</span> is a community-updated list of
        {` ${count}`}&nbsp;video, audio and written tutorials to help you learn{' '}
        <Anchor href="https://www.gatsbyjs.org" className="link">
          GatsbyJS
        </Anchor>
        {`. `}
        <Emoji
          emoji="👩‍💻"
          ariaLabel="An emoji of a woman coding on a laptop"
          className="emoji"
        />
      </h1>
    </div>
  </header>
)

/*
 *
 * Imports & Exports
 *
 */

import React from 'react'

import Anchor from '../components/Anchor'
import Emoji from '../components/Emoji'
import Img from '../components/Img'

export default Header
