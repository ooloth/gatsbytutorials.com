function Sources({ sources, currentSource, setSource }) {
  return (
    <section className="bt b--black-10 pv4">
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
 * Imports & Exports
 *
 */

import React from 'react'

import FilterButton from '../components/FilterButton'

export default Sources
