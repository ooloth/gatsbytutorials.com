function IndexPage({ data }) {
  const tutorials = data.tutorials.edges

  // TODO: replace these runtime calculations with detailed YAML version once we're compiling it at build time

  // 1. Determine which formats exist
  const allFormats = tutorials.map(tutorial => tutorial.node.format)

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
  const allTopics = topicArrays.reduce((acc, curr) => acc.concat(curr), []).sort()

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
  const allAuthors = tutorials.map(tutorial => tutorial.node.author).sort()

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
  // FIXME: how to sort alphabetically with a mix of capital and small first letters?
  const allSources = tutorials.map(tutorial => tutorial.node.source).sort()

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
      <main className="container sans-serif min-vh-75">
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

function Directory({ tutorials, formats, topics, authors, sources }) {
  const [format, setFormat] = useState(null)
  const [author, setAuthor] = useState(null)
  const [source, setSource] = useState(null)
  const [topic, setTopic] = useState(null)
  const [query, setQuery] = useState(null)

  // Filter the visible tutorials based on the active filters and/or search query
  const filteredTutorials = tutorials.filter(({ node: tutorial }) => {
    let isFormatMatch = false
    let isAuthorMatch = false
    let isSourceMatch = false
    let isTopicMatch = false
    let isTitleMatch = false
    let isQueryMatch = false

    // If the user hasn't filtered or searched, abort and include all the tutorials
    if (!author && !source && !topic && !query) return true

    // Check if the tutorial matches any active filters
    if (author && tutorial.author.includes(author)) isAuthorMatch = true
    if (source && tutorial.source.includes(source)) isSourceMatch = true
    if (topic && tutorial.topics.includes(topic)) isTopicMatch = true

    // If the user has typed a query, check if it matches the tutorial's author, source or title (partial string matches of topics to be added soon)
    if (query) {
      const isAuthorMatch = tutorial.author
        .toLowerCase()
        .includes(query.toLowerCase())

      const isSourceMatch = tutorial.source
        .toLowerCase()
        .includes(query.toLowerCase())

      const isTitleMatch = tutorial.title.toLowerCase().includes(query.toLowerCase())
      // TODO: enable this to search topic substrings once we're generating a string version of the topics array for search purposes
      // const isTopicMatch = tutorial.topicSearchString.includes(query);

      isQueryMatch = isAuthorMatch || isSourceMatch || isTitleMatch
    }

    // If the user hasn't typed a query, filter just by author, source and topic
    if (!query) {
      if (topic && !author && !source) {
        return isTopicMatch
      }
      if (topic && author && !source) {
        return isTopicMatch && isAuthorMatch
      }
      if (topic && !author && source) {
        return isTopicMatch && isSourceMatch
      }
      if (!topic && author && !source) {
        return isAuthorMatch
      }
      if (!topic && author && source) {
        return isAuthorMatch && isSourceMatch
      }
      if (!topic && !author && source) {
        return isSourceMatch
      }
    }

    // If the user has typed a query, filter by author, source and topic and the query
    if (query) {
      if (topic && !author && !source) {
        return isTopicMatch && isQueryMatch
      }
      if (topic && author && !source) {
        return isTopicMatch && isAuthorMatch && isQueryMatch
      }
      if (topic && !author && source) {
        return isTopicMatch && isSourceMatch && isQueryMatch
      }
      if (!topic && author && !source) {
        return isAuthorMatch && isQueryMatch
      }
      if (!topic && author && source) {
        return isAuthorMatch && isSourceMatch && isQueryMatch
      }
      if (!topic && !author && source) {
        return isSourceMatch && isQueryMatch
      }
      if (!topic && !author && !source) {
        return isQueryMatch
      }
    }
  })

  return (
    <section>
      <h2 className="sr-only">Search for Gatsby JS tutorials</h2>

      {/* <div className="search-grid bb b--black-05 bg-white"> */}
      <form className="pv3">
        <label className="mono">
          <span className="pr2 fw7">Search:</span>
          <input
            onChange={e => setQuery(e.target.value)}
            type="text"
            placeholder="Type here..."
            className="f6"
          />
        </label>
      </form>

      {format && (
        <div className="flex items-baseline pb3">
          <p className="pr2 mono">
            <span className="pr2 fw7">Format:</span>
            <span className="lh-copy mono f6 black-60">{format}</span>
          </p>
          <button onClick={() => setFormat(null)} className="f6 mono">
            [<span className="link">Clear filter</span>]
          </button>
        </div>
      )}

      {topic && (
        <div className="flex items-baseline pb3">
          <p className="pr2 mono">
            <span className="pr2 fw7">Topic:</span>
            <span className="lh-copy mono f6 black-60">{topic}</span>
          </p>
          <button onClick={() => setTopic(null)} className="f6 mono">
            [<span className="link">Clear filter</span>]
          </button>
        </div>
      )}

      {author && (
        <div className="flex items-baseline pb3">
          <p className="pr2 mono">
            <span className="pr2 fw7">Author:</span>
            <span className="lh-copy mono f6 black-60">{author}</span>
          </p>
          <button onClick={() => setAuthor(null)} className="f6 mono">
            [<span className="link">Clear filter</span>]
          </button>
        </div>
      )}

      {source && (
        <div className="flex items-baseline pb3">
          <p className="pr2 mono">
            <span className="pr2 fw7">Source:</span>
            <span className="lh-copy mono f6 black-60">{source}</span>
          </p>
          <button onClick={() => setSource(null)} className="f6 mono">
            [<span className="link">Clear filter</span>]
          </button>
        </div>
      )}

      {(format || author || source || topic || query) && (
        <p className="pb3 mono">
          <span className="pr2 fw7">Results:</span>
          <span className="lh-copy mono f6 black-60">
            {filteredTutorials.length}
          </span>
        </p>
      )}
      {/* </div> */}

      {/* Currently visible tutorials */}
      <div className="directory-grid">
        <Tutorials
          tutorials={filteredTutorials}
          setAuthor={setAuthor}
          setSource={setSource}
          setTopic={setTopic}
        />

        {/* Lists of all types, topics, authors and sources */}
        <aside>
          <Formats formats={formats} currentFormat={format} setFormat={setFormat} />
          <Topics topics={topics} currentTopic={topic} setTopic={setTopic} />
          <Authors authors={authors} currentAuthor={author} setAuthor={setAuthor} />
          <Sources sources={sources} currentSource={source} setSource={setSource} />
        </aside>
      </div>
    </section>
  )
}

function Formats({ formats, currentFormat, setFormat }) {
  return (
    <section className="bt b--black-05 pv4">
      <h2 className="mb3 mono f5">Formats</h2>

      <ul className="lh-tall">
        {formats.map(format => (
          <li key={format.name}>
            <FilterButton
              text={format.name}
              count={format.count}
              handleFilter={() => setFormat(format.name)}
              className={format.name === currentFormat ? `blue` : ``}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}

function Topics({ topics, currentTopic, setTopic }) {
  return (
    <section className="bt b--black-05 pv4">
      <h2 className="mb3 mono f5">Topics</h2>

      <ul className="lh-tall">
        {topics.map(topic => (
          <li key={topic.name}>
            <FilterButton
              text={topic.name}
              count={topic.count}
              handleFilter={() => setTopic(topic.name)}
              className={topic.name === currentTopic ? `blue` : ``}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}

function Authors({ authors, currentAuthor, setAuthor }) {
  return (
    <section className="bt b--black-05 pv4">
      <h2 className="mb3 mono f5">Authors</h2>

      <ul className="lh-tall">
        {authors.map(author => (
          <li key={author.name}>
            <FilterButton
              text={author.name}
              count={author.count}
              handleFilter={() => setAuthor(author.name)}
              className={author.name === currentAuthor ? `blue` : ``}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}

function Sources({ sources, currentSource, setSource }) {
  return (
    <section className="bt b--black-05 pv4">
      <h2 className="mb3 mono f5">Sources</h2>

      <ul className="lh-tall">
        {sources.map(
          source =>
            source.name && (
              <li key={source.name}>
                <FilterButton
                  text={source.name}
                  count={source.count}
                  handleFilter={() => setSource(source.name)}
                  className={source.name === currentSource ? `blue` : ``}
                />
              </li>
            )
        )}
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
          format
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
