function Tutorials({ tutorials }) {
  return (
    <ul>
      {tutorials.map(tutorial => (
        <Tutorial
          key={tutorial.node.title + tutorial.node.date}
          tutorial={tutorial.node}
        />
      ))}
    </ul>
  )
}

function Tutorial({ tutorial }) {
  let tutorialEmoji
  if (tutorial.type === `video`) {
    tutorialEmoji = (
      <Emoji emoji="📺" ariaLabel="Emoji of a television" className="emoji pl2" />
    )
  } else if (tutorial.type === `writing`) {
    tutorialEmoji = (
      <Emoji emoji="✍️" ariaLabel="Emoji of a hand writing" className="emoji pl2" />
    )
  } else if (tutorial.type === `audio`) {
    tutorialEmoji = (
      <Emoji emoji="🎧" ariaLabel="Emoji of a headphones" className="emoji pl2" />
    )
  }

  return (
    <li className="bt b--black--05 pv4 lh-tall">
      {/* Title */}
      <h3 className="lh-title">
        <Anchor href={tutorial.link} className="link">
          {tutorial.title}
        </Anchor>

        {tutorialEmoji}
      </h3>

      {/* Date and length */}
      <div className="flex pt1">
        {tutorial.date && (
          <p className="flex items-center pr3">
            <DateSVG className="icon" style={{ marginRight: `.45rem` }} />
            {tutorial.date}
          </p>
        )}

        {tutorial.length && (
          <p className="flex items-center">
            <LengthSVG className="icon" style={{ marginRight: `.35rem` }} />
            {tutorial.length}
          </p>
        )}
      </div>

      {tutorial.author && (
        <p className="flex items-center mt3 pt1 f6">
          <AuthorSVG className="icon mr2 black-60" />
          <FilterButton text={tutorial.author} count="1" />
        </p>
      )}

      {tutorial.source && (
        <p className="flex items-center pt1 f6">
          <SourceSVG className="icon mr2 black-60" />
          <FilterButton text={tutorial.source} count="1" />
        </p>
      )}

      {tutorial.topics && (
        <div className="flex items-center mt3 pt1">
          <TopicSVG className="icon mr2 black-60" />

          <ul>
            {tutorial.topics.map(topic => (
              <li key={topic} className="dib mr2">
                <FilterButton text={topic} count="1" />
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  )
}

function FilterButton({ text, count }) {
  return (
    <button className="group lh-copy mono f6 black-60">
      <span className="underline group-hover:blue">{text}</span>[
      <span className="blue">{count}</span>]
    </button>
  )
}

/*
 *
 * Queries
 *
 */

export const query = graphql`
  query {
    tutorials: allTutorialsYaml(sort: { fields: [date], order: DESC }) {
      edges {
        node {
          title
          link
          type
          date(formatString: "MMM DD, YYYY")
          length
          author
          source
          topics
        }
      }
    }
  }
`

/*
 *
 * Imports & Exports
 *
 */

import React from 'react'
import { graphql } from 'gatsby'

import Anchor from '../components/Anchor'
import Emoji from '../components/Emoji'

import { ReactComponent as DateSVG } from '../svg/calendar.svg'
import { ReactComponent as AuthorSVG } from '../svg/user.svg'
import { ReactComponent as SourceSVG } from '../svg/map-marker-alt.svg'
import { ReactComponent as LengthSVG } from '../svg/clock.svg'
import { ReactComponent as TopicSVG } from '../svg/bookmark.svg'

export default Tutorials
