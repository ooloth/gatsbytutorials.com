function IndexPage({ data }) {
  const tutorials = data.tutorials.edges

  // 1. Determine which topics exist
  const topicArrays = tutorials.map(tutorial => tutorial.node.topics)
  const allTopics = topicArrays.reduce((a, b) => a.concat(b), [])

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

  return (
    <Base>
      <main className="container sans-serif min-vh-75">
        <Directory tutorials={tutorials} topics={topics} />
      </main>
    </Base>
  )
}

function Directory({ tutorials, topics }) {
  const [topic, setTopic] = useState(null)
  const [visibleTutorials, setVisibleTutorials] = useState(tutorials)

  function filterByTopic(e) {
    const tutorialsInSelectedTopic = tutorials.filter(tutorial =>
      tutorial.node.topics.includes(e.target.value)
    )

    setTopic(e.target.value)
    setVisibleTutorials(tutorialsInSelectedTopic)
  }

  return (
    <section>
      <h2 className="sr-only">Search for Gatsby JS tutorials</h2>

      {/* Currently visible tutorials */}
      <Tutorials tutorials={visibleTutorials} filterByTopic={filterByTopic} />

      {/* List of all topics */}
      <Topics topics={topics} filterByTopic={filterByTopic} />
    </section>
  )
}

function Topics({ topics, filterByTopic }) {
  return (
    <section className="bt b--black-05 pv4">
      <h2 className="mb3 f4">Topics</h2>

      <ul className="lh-tall">
        {topics.map(topic => (
          <li key={topic.name}>
            <FilterButton
              text={topic.name}
              count={topic.count}
              handleFilter={filterByTopic}
            />
          </li>
        ))}
      </ul>
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

import React, { useState } from 'react'
import { graphql } from 'gatsby'

import Base from '../components/Base'
import FilterButton from '../components/FilterButton'
import Tutorials from '../components/Tutorials'

export default IndexPage
