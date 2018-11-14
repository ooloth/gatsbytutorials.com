function Directory({ tutorials, formats, topics, authors, sources }) {
  const [format, setFormat] = useState(null)
  const [topic, setTopic] = useState(null)
  const [author, setAuthor] = useState(null)
  const [source, setSource] = useState(null)
  const [query, setQuery] = useState(null)
  const searchInput = useRef()

  // On the first render, focus the search input
  useEffect(() => searchInput.current.focus(), [])

  // Filter the visible tutorials based on the active filters and/or search query
  const filteredTutorials = tutorials.filter(({ node: tutorial }) => {
    let isFormatMatch = false
    let isTopicMatch = false
    let isAuthorMatch = false
    let isSourceMatch = false
    let isQueryMatch = false

    // If the user hasn't filtered or searched, abort and include all the tutorials
    if (!format && !author && !source && !topic && !query) return true

    // Check if the tutorial matches any active filters
    if (format && tutorial.format.includes(format)) isFormatMatch = true
    if (topic && tutorial.topics.includes(topic)) isTopicMatch = true
    if (author && tutorial.authors.includes(author)) isAuthorMatch = true
    if (source && tutorial.source.includes(source)) isSourceMatch = true

    // If the user hasn't typed a query, filter just by author, source and topic
    if (!query) {
      // Format combos
      if (format && !topic && !author && !source) {
        return isFormatMatch
      }
      if (format && topic && !author && !source) {
        return isFormatMatch && isTopicMatch
      }
      if (format && topic && author && !source) {
        return isFormatMatch && isTopicMatch && isAuthorMatch
      }
      if (format && topic && author && source) {
        return isFormatMatch && isTopicMatch && isAuthorMatch && isSourceMatch
      }

      // Remaining topic combos
      if (!format && topic && !author && !source) {
        return isTopicMatch
      }
      if (!format && topic && author && !source) {
        return isTopicMatch && isAuthorMatch
      }
      if (!format && topic && !author && source) {
        return isTopicMatch && isSourceMatch
      }

      // Remaining author combos
      if (!format && !topic && author && !source) {
        return isAuthorMatch
      }
      if (!format && !topic && author && source) {
        return isAuthorMatch && isSourceMatch
      }

      // Remaining source combo
      if (!format && !topic && !author && source) {
        return isSourceMatch
      }
    }

    // If the user has typed a query, check if it matches the tutorial's format, author, source or title (TODO: add partial string matches of topics as well)
    if (query) {
      // TODO: replace this logic with a better fuzzy search algorithm...
      const isFormatMatch = tutorial.format
        .toLowerCase()
        .includes(query.toLowerCase())

      const isSourceMatch =
        tutorial.source &&
        tutorial.source.toLowerCase().includes(query.toLowerCase())

      const isTitleMatch = tutorial.title.toLowerCase().includes(query.toLowerCase())

      // TODO: enable these to search topic and author array substrings once we're generating string versions of the topics and authors arrays for search purposes
      // const isTopicMatch = tutorial.topicSearchString.includes(query);
      // const isAuthorMatch = tutorial.authorSearchString.includes(query);

      isQueryMatch = isFormatMatch || isAuthorMatch || isSourceMatch || isTitleMatch

      // If the user has typed a query, filter by the same rules as above for format, author, source and topic, and require the query to match each condition as well
      // Format combos
      if (format && !topic && !author && !source) {
        return isFormatMatch && isQueryMatch
      }
      if (format && topic && !author && !source) {
        return isFormatMatch && isTopicMatch && isQueryMatch
      }
      if (format && topic && author && !source) {
        return isFormatMatch && isTopicMatch && isAuthorMatch && isQueryMatch
      }
      if (format && topic && author && source) {
        return (
          isFormatMatch &&
          isTopicMatch &&
          isAuthorMatch &&
          isSourceMatch &&
          isQueryMatch
        )
      }

      // Remaining topic combos
      if (!format && topic && !author && !source) {
        return isTopicMatch && isQueryMatch
      }
      if (!format && topic && author && !source) {
        return isTopicMatch && isAuthorMatch && isQueryMatch
      }
      if (!format && topic && !author && source) {
        return isTopicMatch && isSourceMatch && isQueryMatch
      }

      // Remaining author combos
      if (!format && !topic && author && !source) {
        return isAuthorMatch && isQueryMatch
      }
      if (!format && !topic && author && source) {
        return isAuthorMatch && isSourceMatch && isQueryMatch
      }

      // Remaining source combo
      if (!format && !topic && !author && source) {
        return isSourceMatch && isQueryMatch
      }

      // Remaining query combo
      if (!format && !topic && !author && !source) {
        return isQueryMatch && isQueryMatch
      }
    }
  })

  return (
    <section>
      <h2 className="sr-only">Search for Gatsby JS tutorials</h2>

      <form className="pv3">
        <label className="mono">
          <span className="pr2 fw7">Search:</span>
          <input
            ref={searchInput}
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

      {/* Tutorials matching search and filter parameters (if any) */}
      <div className="directory-grid">
        <Tutorials
          tutorials={filteredTutorials}
          setAuthor={setAuthor}
          setSource={setSource}
          setTopic={setTopic}
        />

        <aside className="bt b--black-10 pt4">
          {/* Link to add a new tutorial */}
          <Anchor
            href="https://github.com/ooloth/gatsby-tutorials#how-do-i-add-a-tutorial"
            className="link db mb4 md:f6 mono"
          >
            Add a tutorial
            <Emoji
              emoji="🙌"
              ariaLabel="Emoji of two hands raised in appreciation"
              className="emoji pl2"
            />
          </Anchor>

          {/* Lists of all types, topics, authors and sources */}
          <Formats formats={formats} currentFormat={format} setFormat={setFormat} />
          <Topics topics={topics} currentTopic={topic} setTopic={setTopic} />
          <Authors authors={authors} currentAuthor={author} setAuthor={setAuthor} />
          <Sources sources={sources} currentSource={source} setSource={setSource} />
        </aside>
      </div>
    </section>
  )
}

/*
 *
 * Imports & Exports
 *
 */

import React, { useState, useRef, useEffect } from 'react'

import Tutorials from '../components/Tutorials'
import Anchor from '../components/Anchor'
import Emoji from '../components/Emoji'
import Formats from '../components/Formats'
import Topics from '../components/Topics'
import Authors from '../components/Authors'
import Sources from '../components/Sources'

export default Directory
