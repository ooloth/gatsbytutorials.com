function Authors({ authors, currentAuthor, setAuthor }) {
  function handleClick(e) {
    if (e.target.value === currentAuthor) setAuthor(null)
    else setAuthor(e.target.value)
  }

  return (
    <section className="mt3 shadow br2 bg-white h5 overflow-auto animate hover:shadow-lg">
      <h2 className="sticky top-0 pt3 ph3 pb2 mb2 bg-white-90 f4">Authors</h2>

      <ul className="ph3 lh-tall">
        {authors.map(author => (
          <li key={author}>
            <FilterButton
              text={author}
              active={author === currentAuthor}
              handleFilter={handleClick}
              className={author === currentAuthor ? `bg-blue white` : ``}
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
