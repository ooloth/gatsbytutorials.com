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

  // Choose which tutorial category emoji to show next to the title
  let tutorialEmoji
  if (tutorial.format === `video`) {
    tutorialEmoji = (
      <Emoji
        emoji="📺"
        ariaLabel="Emoji of a television"
        className="tutorial-emoji"
      />
    )
  } else if (tutorial.format === `audio`) {
    tutorialEmoji = (
      <Emoji
        emoji="🎧"
        ariaLabel="Emoji of a headphones"
        className="tutorial-emoji"
      />
    )
  } else if (tutorial.format === `text`) {
    tutorialEmoji = (
      <Emoji
        emoji="📕"
        ariaLabel="Emoji of a hand writing"
        className="tutorial-emoji"
      />
    )
  }

  return (
    <li className="mt3 shadow br2 bg-white pa3 lh-tall animate hover:shadow-lg">
      <h3 className="flex items-baseline lh-title fw6">
        <Anchor href={tutorial.link} className="f4 hover:blue hover:underline">
          {tutorial.title}
        </Anchor>
      </h3>

      <div className="flex flex-wrap items-baseline pt1">
        {tutorialEmoji}

        {tutorial.authors && tutorial.authors.length > 0 ? (
          tutorial.authors.map((author, i) => (
            <Fragment key={author}>
              <button
                value={author}
                onClick={handleAuthorClick}
                className={`hover:blue hover:underline ${
                  author === currentAuthor ? `blue underline` : ``
                }`}
              >
                {author}
              </button>

              {i < tutorial.authors.length - 1 && <span>,&nbsp;</span>}
            </Fragment>
          ))
        ) : (
          <button
            value={tutorial.source}
            onClick={handleSourceClick}
            className={`hover:blue hover:underline ${
              tutorial.source === currentSource ? `blue underline` : ``
            }`}
          >
            {tutorial.source}
          </button>
        )}

        {tutorial.date && <p>・{tutorial.date}</p>}
      </div>

      {tutorial.topics && (
        <div
          className={`topics flex ${
            tutorial.authors || tutorial.source ? `mt3 pt1` : ``
          }`}
        >
          <ul className="nb1 lh-solid">
            {tutorial.source && tutorial.authors.length > 0 && (
              <li className="dib mr1 mb1 f6">
                <FilterButton
                  text={tutorial.source}
                  // active={tutorial.source === currentSource}
                  handleFilter={handleSourceClick}
                  className={
                    tutorial.source === currentSource ? `bg-blue white` : ``
                  }
                />
              </li>
            )}

            {tutorial.topics
              .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())) // ignore case
              .map((topic, i) => (
                <li key={i} className="dib mr1 mb1 f6">
                  <FilterButton
                    text={topic.toLowerCase()}
                    // active={topic.toLowerCase() === currentTopic}
                    handleFilter={handleTopicClick}
                    className={
                      topic.toLowerCase() === currentTopic ? `bg-blue white` : ``
                    }
                  />
                </li>
              ))}
          </ul>
        </div>
      )}
    </li>
  )
}

/*
 *
 * Imports & Exports
 *
 */

import React, { Fragment } from 'react'

import Anchor from '../components/Anchor'
import Emoji from '../components/Emoji'
import FilterButton from '../components/FilterButton'

export default Tutorial
