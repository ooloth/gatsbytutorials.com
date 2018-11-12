function Topics({ topics, currentTopic, setTopic }) {
  return (
    <section className="bt b--black-10 pv4">
      <h2 className="mb3 mono f5">Topics</h2>

      <ul className="lh-tall">
        {topics.map(topic => (
          <li key={topic.name}>
            <FilterButton
              text={topic.name}
              count={topic.count}
              handleFilter={() => setTopic(topic.name)}
              className={topic.name === currentTopic ? `blue` : ``}
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
