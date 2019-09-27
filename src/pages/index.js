function IndexPage({ pageContext }) {
  const { tutorials, formats, topics, authors, sources } = pageContext

  return (
    <Base>
      <Main>
        <Directory
          tutorials={tutorials}
          formats={formats}
          topics={topics}
          authors={authors}
          sources={sources}
        />
      </Main>
    </Base>
  )
}

///////////////////////////////////////////////////////////////////////////////////

const Main = styled.main`
  background-color: var(--near-white);
  min-height: 75vh;
  font-family: var(--bodyFont);
`

///////////////////////////////////////////////////////////////////////////////////

import React from 'react'
import styled from 'styled-components'

import Base from '../components/Base'
import Directory from '../components/Directory'

export default IndexPage
