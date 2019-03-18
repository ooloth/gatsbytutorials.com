function Directory({ tutorials, formats, topics, authors, sources }) {
  // TODO: refactor this to useReducer or xstate?
  const [format, setFormat] = useState(null)
  const [topic, setTopic] = useState(null)
  const [author, setAuthor] = useState(null)
  const [source, setSource] = useState(null)
  const [query, setQuery] = useState(``)
  const searchInput = useRef()

  // On the first render, focus the search input
  useEffect(() => searchInput.current.focus(), [])

  function handleQuery(e) {
    setQuery(e.target.value)
    window.scrollTo(0, 0)
  }

  // Filter the visible tutorials based on the active filters and/or search query
  let filteredTutorials = tutorials.filter(({ node: tutorial }) => {
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
    if (source && tutorial.source && tutorial.source.includes(source))
      isSourceMatch = true

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
      if (format && !topic && author && !source) {
        return isFormatMatch && isAuthorMatch
      }
      if (format && !topic && author && source) {
        return isFormatMatch && isAuthorMatch && isSourceMatch
      }
      if (format && !topic && !author && source) {
        return isFormatMatch && isSourceMatch
      }

      // Remaining topic combos
      if (!format && topic && !author && !source) {
        return isTopicMatch
      }
      if (!format && topic && author && !source) {
        return isTopicMatch && isAuthorMatch
      }
      if (!format && topic && author && source) {
        return isTopicMatch && isAuthorMatch && isSourceMatch
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
      if (format && !topic && author && !source) {
        return isFormatMatch && isAuthorMatch && isQueryMatch
      }
      if (format && !topic && author && source) {
        return isFormatMatch && isAuthorMatch && isSourceMatch && isQueryMatch
      }
      if (format && !topic && !author && source) {
        return isFormatMatch && isSourceMatch && isQueryMatch
      }

      // Remaining topic combos
      if (!format && topic && !author && !source) {
        return isTopicMatch && isQueryMatch
      }
      if (!format && topic && author && !source) {
        return isTopicMatch && isAuthorMatch && isQueryMatch
      }
      if (!format && topic && author && source) {
        return isTopicMatch && isAuthorMatch && isSourceMatch && isQueryMatch
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
        return isQueryMatch
      }
    }
  })

  return (
    <section className="">
      <h2 className="sr-only">Search for Gatsby JS tutorials</h2>

      <Sticky>
        {status => (
          <div
            className={`bg-near-white animate ${
              status.status === Sticky.STATUS_FIXED ? `shadow pv2` : ``
            }`}
          >
            <div
              className={`flex justify-between container w-100 animate ${
                status.status === Sticky.STATUS_FIXED
                  ? `items-baseline`
                  : `items-end`
              }`}
            >
              <form className="flex-auto">
                <label className="flex mono">
                  <span className="flex-none pr2 fw7">Search:</span>
                  <input
                    ref={searchInput}
                    value={query}
                    onChange={handleQuery}
                    type="text"
                    placeholder="Type here..."
                    className="flex-auto f6"
                  />
                </label>
              </form>

              <div className="flex items-end">
                <TriggerAndOverlay
                  formats={formats}
                  topics={topics}
                  authors={authors}
                  sources={sources}
                  currentFormat={format}
                  currentTopic={topic}
                  currentAuthor={author}
                  currentSource={source}
                  setFormat={setFormat}
                  setTopic={setTopic}
                  setAuthor={setAuthor}
                  setSource={setSource}
                  className="flex items-center md:dn ml3 br2 pv2 ph3 bg-purple tc white shadow animate hover:bg-blue"
                />

                {/* Link to add a new tutorial */}
                <Anchor
                  href="https://github.com/ooloth/gatsby-tutorials#how-do-i-add-a-tutorial"
                  className="flex-none dn md:inline-flex ml3 br2 pv2 ph3 bg-purple lh-solid tc white shadow animate hover:bg-blue"
                >
                  <span>Add a tutorial</span>

                  <Emoji
                    emoji="🙌"
                    ariaLabel="Emoji of two hands raised in appreciation"
                    className="pl2"
                    style={{ lineHeight: 0.75 }}
                  />
                </Anchor>
              </div>
            </div>
          </div>
        )}
      </Sticky>

      <div className="container pv3">
        {/* {format && (
          <div className="flex items-baseline pb3">
            <p className="pr2 mono">
              <span className="pr2 fw7">Format:</span>
              <span className="lh-copy mono f6 black-60">{format}</span>
            </p>
            <button onClick={() => setFormat(null)} className="f6 mono">
              [<span className="link">Clear filter</span>]
            </button>
          </div>
        )} */}

        {/* {topic && (
          <div className="flex items-baseline pb3">
            <p className="pr2 mono">
              <span className="pr2 fw7">Topic:</span>
              <span className="lh-copy mono f6 black-60">{topic}</span>
            </p>
            <button onClick={() => setTopic(null)} className="f6 mono">
              [<span className="link">Clear filter</span>]
            </button>
          </div>
        )} */}

        {/* {author && (
          <div className="flex items-baseline pb3">
            <p className="pr2 mono">
              <span className="pr2 fw7">Author:</span>
              <span className="lh-copy mono f6 black-60">{author}</span>
            </p>
            <button onClick={() => setAuthor(null)} className="f6 mono">
              [<span className="link">Clear filter</span>]
            </button>
          </div>
        )} */}

        {/* {source && (
          <div className="flex items-baseline pb3">
            <p className="pr2 mono">
              <span className="pr2 fw7">Source:</span>
              <span className="lh-copy mono f6 black-60">{source}</span>
            </p>
            <button onClick={() => setSource(null)} className="f6 mono">
              [<span className="link">Clear filter</span>]
            </button>
          </div>
        )} */}

        {/* {(format || author || source || topic || query) && (
          <p className="pb3 mono">
            <span className="pr2 fw7">Results:</span>
            <span className="lh-copy mono f6 black-60">
              {filteredTutorials.length}
            </span>
          </p>
        )} */}

        {/* Tutorials matching search and filter parameters (if any) */}
        <div className="directory-grid">
          <Tutorials
            tutorials={filteredTutorials}
            currentFormat={format}
            currentTopic={topic}
            currentAuthor={author}
            currentSource={source}
            setFormat={setFormat}
            setTopic={setTopic}
            setAuthor={setAuthor}
            setSource={setSource}
            setQuery={setQuery}
            searchInput={searchInput}
          />

          <aside className="dn md:db">
            {/* Lists of all types, topics, authors and sources */}
            <Formats
              formats={formats}
              currentFormat={format}
              setFormat={setFormat}
            />

            <Topics topics={topics} currentTopic={topic} setTopic={setTopic} />

            <Authors
              authors={authors}
              currentAuthor={author}
              setAuthor={setAuthor}
            />

            <Sources
              sources={sources}
              currentSource={source}
              setSource={setSource}
            />
          </aside>
        </div>
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
import Sticky from 'react-stickynode'

import Tutorials from '../components/Tutorials'
import Anchor from '../components/Anchor'
import Emoji from '../components/Emoji'
import Formats from '../components/Formats'
import Topics from '../components/Topics'
import Authors from '../components/Authors'
import Sources from '../components/Sources'
import TriggerAndOverlay from '../components/TriggerAndOverlay'

export default Directory
