function Sources({ sources, currentSource, setSource }) {
  function handleClick(e) {
    if (e.target.value === currentSource) setSource(null)
    else setSource(e.target.value)
  }

  return (
    <section className="mt3 shadow br2 bg-white h5 overflow-auto animate hover:shadow-lg">
      <h2 className="sticky top-0 pt3 ph3 pb2 mb2 bg-white-90 f4">Sources</h2>

      <ul className="ph3 lh-tall">
        {sources.map(
          source =>
            source && (
              <li key={source}>
                <FilterButton
                  text={source}
                  active={source === currentSource}
                  handleFilter={handleClick}
                  className={source === currentSource ? `bg-blue white` : ``}
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
 * Imports & Exports
 *
 */

import React from 'react'

import FilterButton from '../components/FilterButton'

export default Sources
