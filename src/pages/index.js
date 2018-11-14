function IndexPage({ data }) {
  // Move tutorials with no date to the end of the list
  const tutorials = data.tutorialsWithDates.edges.concat(
    data.tutorialsWithoutDates.edges
  )

  // TODO: replace these runtime calculations with detailed YAML version once we're compiling it at build time

  // 1. Determine which formats exist
  const allFormats = tutorials
    .map(tutorial => tutorial.node.format.toLowerCase()) // convert to lowercase
    .sort()

  // 2. Create an objects with each topic and the number of times it appears
  const formatsWithCounts = allFormats.reduce((acc, curr) => {
    if (typeof acc[curr] == 'undefined') acc[curr] = 1
    else acc[curr] += 1

    return acc
  }, {})

  // 3. Create an array from the object above
  const formats = Object.keys(formatsWithCounts).map(format => {
    return { name: format, count: formatsWithCounts[format] }
  })

  // 1. Determine which topics exist (and sort them alphabetically)
  const topicArrays = tutorials.map(tutorial => tutorial.node.topics)
  const allTopics = topicArrays
    .reduce((acc, curr) => acc.concat(curr), []) // spread topic arrays into one array
    .map(topic => topic.toLowerCase()) // convert topics to lowercase
    .sort() // sort into alphabetical order

  // 2. Create an objects with each topic and the number of times it appears
  const topicsWithCounts = allTopics.reduce((acc, curr) => {
    if (typeof acc[curr] == 'undefined') acc[curr] = 1
    else acc[curr] += 1

    return acc
  }, {})

  // 3. Create an array from the object above
  const topics = Object.keys(topicsWithCounts).map(topic => {
    return { name: topic, count: topicsWithCounts[topic] }
  })

  // 1. Determine which authors exist (and sort them alphabetically)
  // const allAuthors = tutorials.map(tutorial => tutorial.node.author).sort()

  const authorArrays = tutorials
    // .map(tutorial => tutorial.node.authors)
    .map(tutorial => {
      if (tutorial.node.authors) return tutorial.node.authors
      else return []
    })
  const allAuthors = authorArrays
    .reduce((acc, curr) => acc.concat(curr), []) // spread topic arrays into one array
    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())) // ignore case

  // 2. Create an objects with each author and the number of times they appear
  const authorsWithCounts = allAuthors.reduce((acc, curr) => {
    if (typeof acc[curr] == 'undefined') acc[curr] = 1
    else acc[curr] += 1

    return acc
  }, {})

  // 3. Create an array from the object above
  const authors = Object.keys(authorsWithCounts).map(author => {
    return { name: author, count: authorsWithCounts[author] }
  })

  // 1. Determine which sources exist (and sort alphabetically)
  const allSources = tutorials
    .map(tutorial => {
      if (tutorial.node.source) return tutorial.node.source
      else return ''
    })
    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())) // ignore case

  // 2. Create an objects with each author and the number of times they appear
  const sourcesWithCounts = allSources.reduce((acc, curr) => {
    if (typeof acc[curr] == 'undefined') acc[curr] = 1
    else acc[curr] += 1

    return acc
  }, {})

  // 3. Create an array from the object above
  const sources = Object.keys(sourcesWithCounts).map(source => {
    return { name: source, count: sourcesWithCounts[source] }
  })

  return (
    <Base>
      <main className="container min-vh-75 sans-serif">
        <Directory
          tutorials={tutorials}
          formats={formats}
          topics={topics}
          authors={authors}
          sources={sources}
        />
      </main>
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
    tutorialsWithDates: allTutorialsYaml(
      filter: { date: { ne: null } }
      sort: { fields: [date], order: DESC }
    ) {
      edges {
        node {
          title
          link
          format
          date(formatString: "MMM DD, YYYY")
          length
          authors
          source
          topics
        }
      }
    }
    tutorialsWithoutDates: allTutorialsYaml(
      filter: { date: { eq: null } }
      sort: { fields: [title], order: ASC }
    ) {
      edges {
        node {
          title
          link
          format
          language
          date(formatString: "MMM DD, YYYY")
          length
          authors
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
import Directory from '../components/Directory'

export default IndexPage
