function Directory({ tutorials, formats, topics, authors, sources }) {
  // TODO: refactor this to useReducer or xstate?
  const [format, setFormat] = useState(null)
  const [topic, setTopic] = useState(null)
  const [author, setAuthor] = useState(null)
  const [source, setSource] = useState(null)
  const [query, setQuery] = useState(``)
  const searchInput = useRef()

  // On the first render, focus the search input
  useEffect(() => searchInput.current.focus(), [])

  function handleQuery(e) {
    setQuery(e.target.value)
    window.scrollTo(0, 0) // scroll to top whenever typing a search query
  }

  // Filter the visible tutorials based on the active filters and/or search query
  let filteredTutorials = tutorials.filter(({ node: tutorial }) => {
    let isFormatMatch = false
    let isTopicMatch = false
    let isAuthorMatch = false
    let isSourceMatch = false
    let isQueryMatch = false

    // If the user hasn't filtered or searched, abort and include all the tutorials
    if (!format && !author && !source && !topic && !query) return true

    // Check if the tutorial matches any active filters
    if (format && tutorial.format.includes(format)) isFormatMatch = true
    if (topic && tutorial.topics.includes(topic)) isTopicMatch = true
    if (author && tutorial.authors.includes(author)) isAuthorMatch = true
    if (source && tutorial.source && tutorial.source.includes(source))
      isSourceMatch = true

    // If the user hasn't typed a query, filter just by author, source and topic
    if (!query) {
      // Format combos
      if (format && !topic && !author && !source) {
        return isFormatMatch
      }
      if (format && topic && !author && !source) {
        return isFormatMatch && isTopicMatch
      }
      if (format && topic && author && !source) {
        return isFormatMatch && isTopicMatch && isAuthorMatch
      }
      if (format && topic && author && source) {
        return isFormatMatch && isTopicMatch && isAuthorMatch && isSourceMatch
      }
      if (format && !topic && author && !source) {
        return isFormatMatch && isAuthorMatch
      }
      if (format && !topic && author && source) {
        return isFormatMatch && isAuthorMatch && isSourceMatch
      }
      if (format && !topic && !author && source) {
        return isFormatMatch && isSourceMatch
      }

      // Remaining topic combos
      if (!format && topic && !author && !source) {
        return isTopicMatch
      }
      if (!format && topic && author && !source) {
        return isTopicMatch && isAuthorMatch
      }
      if (!format && topic && author && source) {
        return isTopicMatch && isAuthorMatch && isSourceMatch
      }
      if (!format && topic && !author && source) {
        return isTopicMatch && isSourceMatch
      }

      // Remaining author combos
      if (!format && !topic && author && !source) {
        return isAuthorMatch
      }
      if (!format && !topic && author && source) {
        return isAuthorMatch && isSourceMatch
      }

      // Remaining source combo
      if (!format && !topic && !author && source) {
        return isSourceMatch
      }
    }

    // If the user has typed a query, check if it matches the tutorial's format, author, source or title (TODO: add partial string matches of topics as well)
    if (query) {
      // TODO: replace this logic with a better fuzzy search algorithm...
      const isFormatMatch = tutorial.format
        .toLowerCase()
        .includes(query.toLowerCase())

      const isSourceMatch =
        tutorial.source &&
        tutorial.source.toLowerCase().includes(query.toLowerCase())

      const isTitleMatch = tutorial.title
        .toLowerCase()
        .includes(query.toLowerCase())

      // TODO: enable these to search topic and author array substrings once we're generating string versions of the topics and authors arrays for search purposes
      // const isTopicMatch = tutorial.topicSearchString.includes(query);
      // const isAuthorMatch = tutorial.authorSearchString.includes(query);

      isQueryMatch =
        isFormatMatch || isAuthorMatch || isSourceMatch || isTitleMatch

      // If the user has typed a query, filter by the same rules as above for format, author, source and topic, and require the query to match each condition as well
      // Format combos
      if (format && !topic && !author && !source) {
        return isFormatMatch && isQueryMatch
      }
      if (format && topic && !author && !source) {
        return isFormatMatch && isTopicMatch && isQueryMatch
      }
      if (format && topic && author && !source) {
        return isFormatMatch && isTopicMatch && isAuthorMatch && isQueryMatch
      }
      if (format && topic && author && source) {
        return (
          isFormatMatch &&
          isTopicMatch &&
          isAuthorMatch &&
          isSourceMatch &&
          isQueryMatch
        )
      }
      if (format && !topic && author && !source) {
        return isFormatMatch && isAuthorMatch && isQueryMatch
      }
      if (format && !topic && author && source) {
        return isFormatMatch && isAuthorMatch && isSourceMatch && isQueryMatch
      }
      if (format && !topic && !author && source) {
        return isFormatMatch && isSourceMatch && isQueryMatch
      }

      // Remaining topic combos
      if (!format && topic && !author && !source) {
        return isTopicMatch && isQueryMatch
      }
      if (!format && topic && author && !source) {
        return isTopicMatch && isAuthorMatch && isQueryMatch
      }
      if (!format && topic && author && source) {
        return isTopicMatch && isAuthorMatch && isSourceMatch && isQueryMatch
      }
      if (!format && topic && !author && source) {
        return isTopicMatch && isSourceMatch && isQueryMatch
      }

      // Remaining author combos
      if (!format && !topic && author && !source) {
        return isAuthorMatch && isQueryMatch
      }
      if (!format && !topic && author && source) {
        return isAuthorMatch && isSourceMatch && isQueryMatch
      }

      // Remaining source combo
      if (!format && !topic && !author && source) {
        return isSourceMatch && isQueryMatch
      }

      // Remaining query combo
      if (!format && !topic && !author && !source) {
        return isQueryMatch
      }
    }
  })

  return (
    <>
      <section>
        <SrText as="h2">Search for Gatsby JS tutorials</SrText>

        <StyledSticky>
          {status => (
            <SearchBar sticky={status.status === Sticky.STATUS_FIXED}>
              <Inner sticky={status.status === Sticky.STATUS_FIXED}>
                <Form>
                  <Label>
                    <Text>Search:</Text>
                    <Input
                      ref={searchInput}
                      value={query}
                      onChange={handleQuery}
                      type="text"
                      placeholder="Type here..."
                    />
                  </Label>
                </Form>

                <MobileMenu
                  formats={formats}
                  topics={topics}
                  authors={authors}
                  sources={sources}
                  currentFormat={format}
                  currentTopic={topic}
                  currentAuthor={author}
                  currentSource={source}
                  setFormat={setFormat}
                  setTopic={setTopic}
                  setAuthor={setAuthor}
                  setSource={setSource}
                />

                <AddTutorial href="https://github.com/ooloth/gatsby-tutorials#how-do-i-add-a-tutorial">
                  <span>Add a tutorial</span>
                  <HandsUp
                    emoji="🙌"
                    ariaLabel="Emoji of two hands raised in appreciation"
                  />
                </AddTutorial>
              </Inner>
            </SearchBar>
          )}
        </StyledSticky>
      </section>

      <Container>
        <LayoutGrid>
          {/* Tutorials matching search and filter parameters (if any) */}
          <Tutorials
            tutorials={filteredTutorials}
            currentFormat={format}
            currentTopic={topic}
            currentAuthor={author}
            currentSource={source}
            setFormat={setFormat}
            setTopic={setTopic}
            setAuthor={setAuthor}
            setSource={setSource}
            setQuery={setQuery}
            searchInput={searchInput}
          />

          {/* Lists of all formats, topics, authors and sources */}
          <Sidebar>
            <FilterMenu
              heading="Formats"
              filters={formats}
              activeFilter={format}
              setFilter={setFormat}
            />

            <FilterMenu
              heading="Topics"
              filters={topics}
              activeFilter={topic}
              setFilter={setTopic}
            />

            <FilterMenu
              heading="Authors"
              filters={authors}
              activeFilter={author}
              setFilter={setAuthor}
            />

            <FilterMenu
              heading="Sources"
              filters={sources}
              activeFilter={source}
              setFilter={setSource}
            />

            <Contributors />
          </Sidebar>
        </LayoutGrid>
      </Container>
    </>
  )
}

///////////////////////////////////////////////////////////////////////////////////

const StyledSticky = styled(Sticky)`
  position: relative;
  z-index: 1;
`

const SearchBar = styled.div`
  background-color: var(--near-white);
  transition: all 0.2s ease-in-out;

  ${p =>
    p.sticky &&
    css`
      box-shadow: var(--shadow);
      padding-top: var(--s2);
      padding-bottom: var(--s2);
    `}
`

const Inner = styled.div`
  ${container}
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  transition: all 0.2s ease-in-out;

  ${p =>
    p.sticky &&
    css`
      align-items: baseline;
    `}
`

const AddTutorial = styled(Anchor)`
  flex: none;
  display: none;
  margin-left: var(--s4);
  box-shadow: var(--shadow);
  border-radius: var(--r2);
  background-color: var(--purple);
  padding: var(--s2) var(--s4);
  line-height: 1;
  text-align: center;
  color: white;
  transition: background-color 0.2s ease-in-out;

  ${media.md`
    display: inline-flex;
  `}

  &:hover {
    background-color: var(--blue);
  }
`

const Container = styled.section`
  ${container}
  padding-top: var(--s4);
  padding-bottom: var(--s4);
`

const Form = styled.form`
  flex: 1 1 auto;
  min-width: 0;
  min-height: 0;
`

const Label = styled.label`
  display: flex;
  font-family: var(--codeFont);
`

const Text = styled.span`
  flex: none;
  padding-right: var(--s2);
  font-weight: 700;
`

const Input = styled.input`
  flex: 1 1 auto;
  min-width: 0;
  min-height: 0;
  font-size: var(--f2);
`

const HandsUp = styled(Emoji)`
  padding-left: var(--s2);
  line-height: 0.75;
`

const LayoutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  & > div > section {
    margin-left: var(--s6);
  }
`

const Sidebar = styled.div`
  display: none;
  max-width: 19rem;

  ${media.md`
    display: block;
    
  `}

  ${media.lg`
    max-width: 22rem;
  `}

  ${media.xl`
    max-width: var(--s13);
  `}
`

///////////////////////////////////////////////////////////////////////////////////

import React, { useState, useRef, useEffect } from 'react'
import styled, { css } from 'styled-components'
import Sticky from 'react-stickynode'

import Contributors from './Contributors'
import SrText from './SrText'
import Tutorials from './Tutorials'
import Anchor from './Anchor'
import Emoji from './Emoji'
import FilterMenu from './FilterMenu'
import MobileMenu from './MobileMenu'
import { container, media } from '../styles'

export default Directory
