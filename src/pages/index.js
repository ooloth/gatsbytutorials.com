function IndexPage({ data }) {
  return (
    <Base>
      <main className="container sans-serif min-vh-75">
        <Directory tutorials={data.tutorials.edges} />
      </main>
    </Base>
  )
}

function Directory({ tutorials }) {
  return (
    <section>
      <h2 className="sr-only">Search for Gatsby JS tutorials</h2>

      {/* Currently visible tutorials */}
      <Tutorials tutorials={tutorials} />
    </section>
  )
}

/*
 *
 * Queries
 *
 */

export const query = graphql`
  query {
    tutorials: allTutorialsYaml(sort: { fields: [date], order: DESC }) {
      edges {
        node {
          title
          link
          type
          date(formatString: "MMM DD, YYYY")
          length
          author
          source
          topics
        }
      }
    }
  }
`

/*
 *
 * Imports & Exports
 *
 */

import React from 'react'
import { graphql } from 'gatsby'

import Base from '../components/Base'
import Tutorials from '../components/Tutorials'

export default IndexPage
