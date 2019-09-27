function Tutorial({
  tutorial,
  currentTopic,
  currentAuthor,
  currentSource,
  setAuthor,
  setSource,
  setTopic
}) {
  function handleTopicClick(e) {
    if (e.target.value === currentTopic) setTopic(null)
    else setTopic(e.target.value)
  }

  function handleAuthorClick(e) {
    if (e.target.value === currentAuthor) setAuthor(null)
    else setAuthor(e.target.value)
  }

  function handleSourceClick(e) {
    if (e.target.value === currentSource) setSource(null)
    else setSource(e.target.value)
  }

  const tutorialEmojis = {
    text: '📕',
    video: '📺',
    audio: '🎧'
  }

  return (
    <Item>
      <Title>
        <Link href={tutorial.link}>{tutorial.title}</Link>
      </Title>

      <Details>
        {tutorial.formats &&
          tutorial.formats.length > 0 &&
          tutorial.formats.map((format, i) => (
            <Emoji
              key={i}
              emoji={tutorialEmojis[format] || '❓'}
              ariaLabel={`Emoji of a ${format}`}
            />
          ))}
        &nbsp;
        {tutorial.authors && tutorial.authors.length > 0 ? (
          tutorial.authors.map((author, i) => (
            <Fragment key={author}>
              <Button
                value={author}
                onClick={handleAuthorClick}
                active={author === currentAuthor}
              >
                {author}
              </Button>

              {i < tutorial.authors.length - 1 && <span>,&nbsp;</span>}
            </Fragment>
          ))
        ) : (
          <Button
            value={tutorial.source}
            onClick={handleSourceClick}
            active={tutorial.source === currentSource}
          >
            {tutorial.source}
          </Button>
        )}
        {tutorial.date && <p>・{tutorial.date}</p>}
      </Details>

      {tutorial.topics && (
        <Topics includesAuthorOrSource={tutorial.authors || tutorial.source}>
          <List>
            {tutorial.source && tutorial.authors.length > 0 && (
              <ListItem>
                <FilterButton
                  text={tutorial.source}
                  active={tutorial.source === currentSource}
                  handleFilter={handleSourceClick}
                />
              </ListItem>
            )}

            {tutorial.topics
              .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())) // ignore case
              .map((topic, i) => (
                <ListItem key={i}>
                  <FilterButton
                    text={topic.toLowerCase()}
                    active={topic.toLowerCase() === currentTopic}
                    handleFilter={handleTopicClick}
                  />
                </ListItem>
              ))}
          </List>
        </Topics>
      )}
    </Item>
  )
}

///////////////////////////////////////////////////////////////////////////////////

const Item = styled.li`
  margin-top: var(--s4);
  box-shadow: var(--shadow);
  border-radius: var(--r2);
  background-color: white;
  padding: var(--s4);
  line-height: var(--lh3);
  transition: box-shadow 0.2s ease-in-out;

  &:hover {
    box-shadow: var(--shadow-lg);
  }
`

const Title = styled.h3`
  display: flex;
  align-items: baseline;
  line-height: var(--lh1);
  font-weight: 600;
`

const Link = styled(Anchor)`
  font-size: var(--f5);
  transition: color 0.05s ease-in-out;

  &:hover {
    color: var(--purple);
    text-decoration: underline;
  }
`

const Details = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  padding-top: var(--s1);
`

const Button = styled.button`
  &:hover {
    color: blue;
    text-decoration: underline;
  }

  ${props =>
    props.active &&
    css`
      color: blue;
      text-decoration: underline;
    `}
`

const Topics = styled.div`
  display: flex;

  ${props =>
    props.includesAuthorOrSource &&
    css`
      margin-top: var(--s4);
      padding-top: var(--s1);
    `}
`

const List = styled.ul`
  margin-top: calc(var(--s1) * -1);
  line-height: 1;
`

const ListItem = styled.li`
  display: inline-block;
  margin-right: var(--s1);
  margin-bottom: var(--s1);
  font-size: var(--f2);
`

///////////////////////////////////////////////////////////////////////////////////

import React, { Fragment } from 'react'
import styled, { css } from 'styled-components'

import Anchor from './Anchor'
import Emoji from './Emoji'
import FilterButton from './FilterButton'

export default Tutorial
