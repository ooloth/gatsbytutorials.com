function Formats({ formats, currentFormat, setFormat }) {
  return (
    <section className="bt b--black-10 pv4">
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

/*
 *
 * Imports & Exports
 *
 */

import React from 'react'

import FilterButton from '../components/FilterButton'

export default Formats
