function Sources({ sources, currentSource, setSource }) {
  function handleClick(e) {
    if (e.target.value === currentSource) setSource(null)
    else setSource(e.target.value)
  }

  return (
    <section className="mt3 shadow br2 bg-white pa3 h5 overflow-auto animate hover:shadow-lg">
      <h2 className="mb3 f4">Sources</h2>

      <ul className="lh-tall">
        {sources.map(
          source =>
            source.name && (
              <li key={source.name}>
                <FilterButton
                  text={source.name}
                  count={source.count}
                  active={source.name === currentSource}
                  handleFilter={handleClick}
                  className={source.name === currentSource ? `bg-blue white` : ``}
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
