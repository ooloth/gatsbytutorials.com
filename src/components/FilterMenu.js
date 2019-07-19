function FilterMenu({ heading, filters, activeFilter, setFilter }) {
  function handleClick(e) {
    if (e.target.value === activeFilter) setFilter(null)
    else setFilter(e.target.value)
  }

  return (
    <Section>
      <Heading>{heading}</Heading>

      <List>
        {filters.map(
          filter =>
            filter && (
              <li key={filter}>
                <FilterButton
                  text={filter}
                  active={filter === activeFilter}
                  handleFilter={handleClick}
                />
              </li>
            )
        )}
      </List>
    </Section>
  )
}

///////////////////////////////////////////////////////////////////////////////////

const Section = styled.section`
  margin-bottom: var(--s4);
  box-shadow: var(--shadow);
  border-radius: var(--r2);
  background-color: white;
  padding-bottom: var(--s4);
  max-height: var(--s12);
  overflow: auto;
  transition: all 0.2s ease-in-out;

  &:hover {
    box-shadow: var(--shadow-lg);
  }
`

const Heading = styled.h2`
  position: sticky;
  top: 0;
  margin-bottom: var(--s1);
  background-color: var(--white-90);
  padding: var(--s4) var(--s4) var(--s2);
  font-size: var(--f5);
`

const List = styled.ul`
  padding-left: var(--s4);
  padding-right: var(--s4);
  line-height: var(--lh3);
`

///////////////////////////////////////////////////////////////////////////////////

import React from 'react'
import styled from 'styled-components'

import FilterButton from './FilterButton'

export default FilterMenu
