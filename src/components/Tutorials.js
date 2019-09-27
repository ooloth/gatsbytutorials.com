function Tutorials({
  tutorials,
  currentFormat,
  currentTopic,
  currentAuthor,
  currentSource,
  setFormat,
  setTopic,
  setAuthor,
  setSource,
  setQuery,
  searchInput
}) {
  function resetSearch() {
    setFormat(null)
    setTopic(null)
    setAuthor(null)
    setSource(null)
    setQuery(``)
    searchInput.current.focus()
  }

  return tutorials && tutorials.length > 0 ? (
    <List>
      {tutorials.map(tutorial => (
        <Tutorial
          key={tutorial.title + tutorial.date}
          tutorial={tutorial}
          currentFormat={currentFormat}
          currentTopic={currentTopic}
          currentAuthor={currentAuthor}
          currentSource={currentSource}
          setAuthor={setAuthor}
          setSource={setSource}
          setTopic={setTopic}
        />
      ))}
    </List>
  ) : (
    <NoResults resetSearch={resetSearch} />
  )
}

///////////////////////////////////////////////////////////////////////////////////

const List = styled.ul`
  margin-top: calc(var(--s4) * -1);
`

///////////////////////////////////////////////////////////////////////////////////

function NoResults({ resetSearch }) {
  return (
    <Message>
      <Heading>No results</Heading>
      <Button onClick={resetSearch}>Reset search</Button>
    </Message>
  )
}

///////////////////////////////////////////////////////////////////////////////////

const Message = styled.div`
  align-self: flex-start;
  box-shadow: var(--shadow);
  border-radius: var(--r2);
  background-color: white;
  padding: var(--s6);
  text-align: center;
`

const Heading = styled.h3`
  padding-bottom: var(--s1);
  line-height: 1;
  font-size: var(--f6);
  font-weight: 600;
`

const Button = styled.button`
  display: inline-flex;
  margin-top: var(--s4);
  border-radius: var(--r2);
  background-color: var(--purple);
  padding: var(--s2) var(--s4);
  white-space: nowrap;
  color: white;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: var(--blue);
  }
`

///////////////////////////////////////////////////////////////////////////////////

import React from 'react'
import styled from 'styled-components'

import Tutorial from './Tutorial'

export default Tutorials
