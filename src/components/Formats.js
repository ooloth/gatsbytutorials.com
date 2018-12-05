function Formats({ formats, currentFormat, setFormat }) {
  function handleClick(e) {
    if (e.target.value === currentFormat) setFormat(null)
    else setFormat(e.target.value)
  }

  return (
    <section className="shadow br2 bg-white pa3 animate hover:shadow-lg">
      <h2 className="mb3 f4">Formats</h2>

      <ul className="lh-tall">
        {formats.map(format => (
          <li key={format.name}>
            <FilterButton
              text={format.name}
              count={format.count}
              active={format.name === currentFormat}
              handleFilter={handleClick}
              className={format.name === currentFormat ? `bg-blue white` : ``}
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
