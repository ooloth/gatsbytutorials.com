function Topics({ topics, currentTopic, setTopic }) {
  function handleClick(e) {
    if (e.target.value === currentTopic) setTopic(null)
    else setTopic(e.target.value)
  }

  return (
    <section className="relative mt3 shadow br2 bg-white h5 overflow-auto animate hover:shadow-lg">
      <h2 className="sticky top-0 pt3 ph3 pb2 mb2 bg-white-90 f4">Topics</h2>

      <ul className="ph3 lh-tall">
        {topics.map(topic => (
          <li key={topic}>
            <FilterButton
              text={topic}
              active={topic === currentTopic}
              handleFilter={handleClick}
              className={topic === currentTopic ? `bg-blue white` : ``}
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

export default Topics
