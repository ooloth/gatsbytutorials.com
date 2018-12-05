function Tutorials({
  tutorials,
  currentFormat,
  currentTopic,
  currentAuthor,
  currentSource,
  setFormat,
  setTopic,
  setAuthor,
  setSource,
  setQuery,
  searchInput
}) {
  function resetSearch() {
    setFormat(null)
    setTopic(null)
    setAuthor(null)
    setSource(null)
    setQuery(``)
    searchInput.current.focus()
  }

  return tutorials.length > 0 ? (
    <ul className="nt3">
      {tutorials.map(tutorial => (
        <Tutorial
          key={tutorial.node.title + tutorial.node.date}
          tutorial={tutorial.node}
          currentFormat={currentFormat}
          currentTopic={currentTopic}
          currentAuthor={currentAuthor}
          currentSource={currentSource}
          setAuthor={setAuthor}
          setSource={setSource}
          setTopic={setTopic}
        />
      ))}
    </ul>
  ) : (
    <NoResults resetSearch={resetSearch} />
  )
}

/*
 *
 * No Results
 *
 */

function NoResults({ resetSearch }) {
  return (
    <div className="self-start tc br2 bg-white pv4 ph3 shadow">
      <h3 className="pb1 lh-solid f3 fw6">No results</h3>

      <button
        onClick={resetSearch}
        className="inline-flex mt3 br2 bg-purple pv2 ph3 no-wrap white animate hover:bg-blue"
      >
        Reset search
      </button>
    </div>
  )
}

/*
 *
 * Imports & Exports
 *
 */

import React from 'react'

import Tutorial from '../components/Tutorial'

export default Tutorials
