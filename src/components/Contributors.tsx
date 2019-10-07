function Contributors() {
  const contributors: Contributors = useContributorsData()

  return (
    <Section>
      <Heading>
        Contributors{' '}
        <Emoji emoji="😍" ariaLabel="A smiling cartoon face with hearts for eyes" />
      </Heading>

      <List>
        {contributors
          .filter(contributor => contributor.id !== `dummy`)
          .map(contributor => {
            return (
              <Fragment key={contributor.id}>
                <Item>
                  <Anchor href={contributor.html_url}>
                    <Avatar
                      fluid={{
                        ...contributor.avatarImage.childImageSharp.fluid,
                        aspectRatio: 1 / 1,
                      }}
                      alt={`Visit the GitHub page of ${contributor.login} (opens in a new window).`}
                    />
                  </Anchor>
                </Item>
              </Fragment>
            )
          })}
      </List>
    </Section>
  )
}

type Contributors = Array<Contributor>

interface Contributor {
  avatarImage: GatsbyImageSharpFluid_withWebp
  html_url: string
  id: string
  login: string
}

interface GatsbyImageSharpFluid_withWebp {
  childImageSharp: {
    fluid: {
      base64: string
      aspectRatio: number
      src: string
      srcSet: string
      srcWebp: string
      srcSetWebp: string
      sizes: string
    }
  }
}

///////////////////////////////////////////////////////////////////////////////////

const Section = styled.section`
  padding-top: var(--s3);
  padding-left: var(--s4);
  padding-right: var(--s4);
`

const Heading = styled.h2`
  font-size: var(--f5);
`

const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(var(--s6), 1fr));
  grid-gap: var(--s2);
  padding-top: var(--s4);
`

const Item = styled.li`
  box-shadow: var(--shadow);
  transition: all 0.2s ease-in-out;
  &:hover {
    box-shadow: var(--shadow-lg);
    opacity: 0.75;
  }
`

const Avatar = styled(Image)`
  border-radius: var(--r2);
`

///////////////////////////////////////////////////////////////////////////////////

import React, { Fragment } from 'react'
import styled from 'styled-components'
import Image from 'gatsby-image'

import Anchor from './Anchor'
import Emoji from './Emoji'
import useContributorsData from '../queries/useContributorsData'

export default Contributors
