function Tutorial({ tutorial, setAuthor, setSource, setTopic }) {
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
        emoji="✍️"
        ariaLabel="Emoji of a hand writing"
        className="tutorial-emoji"
      />
    )
  }

  return (
    <li className="bt b--black-10 pv4 lh-tall">
      <h3 className="flex items-baseline lh-title fw6">
        {tutorialEmoji}
        <Anchor href={tutorial.link} className="link">
          {tutorial.title}
        </Anchor>
      </h3>

      <div className="flex pt1 pb3">
        <p className={`flex items-center pr3`}>
          <DateSVG className="icon mr2" />
          {tutorial.date ? tutorial.date : `Not specified`}
        </p>

        {tutorial.length && (
          <p className="flex items-center">
            <LengthSVG className="icon" style={{ marginRight: `.35rem` }} />
            {tutorial.length}
          </p>
        )}
      </div>

      {tutorial.authors &&
        tutorial.authors.map(author => (
          <p key={author} className="flex items-center pt1 f6">
            <AuthorSVG className="icon mr2 black-60" />
            <FilterButton text={author} handleFilter={() => setAuthor(author)} />
          </p>
        ))}

      {tutorial.source && (
        <p className="flex items-center pt1 f6">
          <SourceSVG className="icon mr2 black-60" />
          <FilterButton
            text={tutorial.source}
            handleFilter={() => setSource(tutorial.source)}
          />
        </p>
      )}

      {tutorial.topics && (
        <div
          className={`topics flex ${
            tutorial.authors || tutorial.source ? `mt3 pt1` : ``
          }`}
        >
          <TopicSVG
            className="icon mr2 black-60"
            style={{ transform: `translateY(.4rem)` }}
          />

          <ul>
            {tutorial.topics
              .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())) // ignore case
              .map((topic, i) => (
                <li key={i} className="dib mr2">
                  <FilterButton
                    text={topic.toLowerCase()}
                    handleFilter={() => setTopic(topic.toLowerCase())}
                  />
                  {i < tutorial.topics.length - 1 && `, `}
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

import React from 'react'

import Anchor from '../components/Anchor'
import Emoji from '../components/Emoji'
import FilterButton from '../components/FilterButton'

import { ReactComponent as DateSVG } from '../svg/calendar.svg'
import { ReactComponent as AuthorSVG } from '../svg/user.svg'
import { ReactComponent as SourceSVG } from '../svg/bullhorn.svg'
import { ReactComponent as LengthSVG } from '../svg/clock.svg'
import { ReactComponent as TopicSVG } from '../svg/bookmark.svg'

export default Tutorial
