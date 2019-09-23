function Directory({ tutorials, formats, topics, authors, sources }) {
  const [format, setFormat] = useState(``)
  const [topic, setTopic] = useState(``)
  const [author, setAuthor] = useState(``)
  const [source, setSource] = useState(``)
  const [query, setQuery] = useState(``)
  const searchInput = useRef()

  // On the first render, focus the search input
  useEffect(() => searchInput.current.focus(), [])

  function handleQuery(e) {
    setQuery(e.target.value)
    window.scrollTo(0, 0) // scroll to top whenever typing a search query
  }

  const filteredTuts = useMemo(
    () => filterTutorials(tutorials, format, topic, author, source),
    [tutorials, format, topic, author, source]
  )

  const fuse = new Fuse(filteredTuts, fuseOptions)
  const filteredAndSearchedTuts = query ? fuse.search(query) : filteredTuts

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
                      maxlength="32"
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
            tutorials={filteredAndSearchedTuts}
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

function filterTutorials(tutorials, format, author, source, topic) {
  if (!format && !author && !source && !topic) return tutorials

  return tutorials.filter(({ node: tutorial }) => {
    const isFormatMatch =
      format && tutorial.formats && new Set(tutorial.formats).has(format)

    const isTopicMatch =
      topic && tutorial.topics && new Set(tutorial.topics).has(topic)

    const isAuthorMatch =
      author && tutorial.authors && new Set(tutorial.authors).has(author)

    const isSourceMatch =
      source && tutorial.source && new Set(tutorial.sources).has(source)

    return (
      (format ? isFormatMatch : true) &&
      (topic ? isTopicMatch : true) &&
      (author ? isAuthorMatch : true) &&
      (source ? isSourceMatch : true)
    )
  })
}

const fuseOptions = {
  shouldSort: true,
  threshold: 0.25,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    `node.title`,
    `node.formats`,
    `node.topics`,
    `node.authors`,
    `node.sources`
  ]
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

import React, { useState, useRef, useEffect, useMemo } from 'react'
import styled, { css } from 'styled-components'
import Sticky from 'react-stickynode'
import Fuse from 'fuse.js'

import Contributors from './Contributors'
import SrText from './SrText'
import Tutorials from './Tutorials'
import Anchor from './Anchor'
import Emoji from './Emoji'
import FilterMenu from './FilterMenu'
import MobileMenu from './MobileMenu'
import { container, media } from '../styles'

export default Directory
