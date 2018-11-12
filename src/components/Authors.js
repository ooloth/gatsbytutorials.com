function Authors({ authors, currentAuthor, setAuthor }) {
  return (
    <section className="bt b--black-10 pv4">
      <h2 className="mb3 mono f5">Authors</h2>

      <ul className="lh-tall">
        {authors.map(author => (
          <li key={author.name}>
            <FilterButton
              text={author.name}
              count={author.count}
              handleFilter={() => setAuthor(author.name)}
              className={author.name === currentAuthor ? `blue` : ``}
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
