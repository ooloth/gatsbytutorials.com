function Tutorials({ tutorials, setAuthor, setSource, setTopic }) {
  return (
    <ul>
      {tutorials.map(tutorial => (
        <Tutorial
          key={tutorial.node.title + tutorial.node.date}
          tutorial={tutorial.node}
          setAuthor={setAuthor}
          setSource={setSource}
          setTopic={setTopic}
        />
      ))}
    </ul>
  )
}

/*
 *
 * Imports & Exports
 *
 */

import React from 'react'

import Tutorial from '../components/Tutorial'

export default Tutorials
