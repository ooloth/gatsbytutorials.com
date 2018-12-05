function Authors({ authors, currentAuthor, setAuthor }) {
  function handleClick(e) {
    if (e.target.value === currentAuthor) setAuthor(null)
    else setAuthor(e.target.value)
  }

  return (
    <section className="mt3 shadow br2 bg-white pa3 h5 overflow-auto animate hover:shadow-lg">
      <h2 className="mb3 f4">Authors</h2>

      <ul className="lh-tall">
        {authors.map(author => (
          <li key={author.name}>
            <FilterButton
              text={author.name}
              count={author.count}
              active={author.name === currentAuthor}
              handleFilter={handleClick}
              className={author.name === currentAuthor ? `bg-blue white` : ``}
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

export default Authors
