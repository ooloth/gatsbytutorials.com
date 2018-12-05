function FilterButton({ text, count, active, handleFilter, className = `` }) {
  return (
    <button
      value={text}
      onClick={handleFilter}
      className={`inline-flex mt2 br2 bg-light-gray pv1 ph2 no-wrap hover:bg-blue hover:white ${className}`}
    >
      <span className="pointer-events-none">{text}</span>

      {active && <span>&nbsp;×</span>}

      {/* {count && (
        <>
          <span className="pl1">(</span>
          <span className="relative blue">{count}</span>
          <span>)</span>
        </>
      )} */}
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
