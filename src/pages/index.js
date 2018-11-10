function IndexPage({ data }) {
  return (
    <Base>
      <main className="container sans-serif">Add the good stuff here...</main>
    </Base>
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
          author
          link
          date(formatString: "MMMM DD, YYYY")
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

export default IndexPage
