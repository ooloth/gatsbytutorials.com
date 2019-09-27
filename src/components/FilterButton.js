function FilterButton({ text, active, handleFilter, ...props }) {
  return (
    <Button value={text} active={active} onClick={handleFilter} {...props}>
      <Text>{text}</Text>
      {active && <span>&nbsp;×</span>}
    </Button>
  )
}

///////////////////////////////////////////////////////////////////////////////////

const Button = styled.button`
  display: inline-flex;
  margin-top: var(--s2);
  border-radius: var(--r2);
  background-color: var(--light-gray);
  padding: var(--s1) var(--s2);
  white-space: nowrap;
  transition: color 0.05s ease-in-out, background-color 0.05s ease-in-out;

  &:hover {
    background-color: var(--purple);
    color: white;
  }

  ${props =>
    props.active &&
    css`
      background-color: var(--purple);
      color: white;
    `}
`

const Text = styled.span`
  pointer-events: none;
`

///////////////////////////////////////////////////////////////////////////////////

import React from 'react'
import styled, { css } from 'styled-components'

export default FilterButton
