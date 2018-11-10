function FilterButton({ text, count, handleFilter }) {
  return (
    <button
      value={text}
      onClick={handleFilter}
      className="group lh-copy mono f6 black-60"
    >
      <span className="relative z--1 underline group-hover:blue">{text}</span>
      {count && (
        <>
          [<span className="relative z--1 blue">{count}</span>]
        </>
      )}
    </button>
  )
}

/*
 *
 * Imports & Exports
 *
 */

import React from 'react'

export default FilterButton
