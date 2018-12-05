function Topics({ topics, currentTopic, setTopic }) {
  function handleClick(e) {
    if (e.target.value === currentTopic) setTopic(null)
    else setTopic(e.target.value)
  }

  return (
    <section className="mt3 shadow br2 bg-white pa3 h5 overflow-auto animate hover:shadow-lg">
      <h2 className="mb3 f4">Topics</h2>

      <ul className="lh-tall">
        {topics.map(topic => (
          <li key={topic.name}>
            <FilterButton
              text={topic.name}
              count={topic.count}
              active={topic.name === currentTopic}
              handleFilter={handleClick}
              className={topic.name === currentTopic ? `bg-blue white` : ``}
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
