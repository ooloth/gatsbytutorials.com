function IndexPage() {
  const [tutorialsWithDates, tutorialsWithoutDates] = useTutorialsData()

  // Move tutorials with no date to the end of the list
  const tutorials = [...tutorialsWithDates, ...tutorialsWithoutDates]

  // TODO: replace these runtime calculations with detailed YAML version once we're compiling these lists at build time

  // Create a sorted list of all unique formats
  const formats = [
    ...new Set(tutorials.map(tutorial => tutorial.node.format.toLowerCase()))
  ].sort()

  // Create a sorted list of all unique topics
  const topicArrays = tutorials.map(tutorial => tutorial.node.topics)
  const topics = [
    ...new Set(
      topicArrays
        .reduce((acc, curr) => [...acc, ...curr]) // merge arrays into one
        .map(topic => topic.toLowerCase()) // convert all topics to lowercase
    )
  ].sort()

  // Create a sorted list of all unique authors
  const authorArrays = tutorials.map(tutorial => tutorial.node.authors)
  const authors = [
    ...new Set(
      authorArrays.reduce((acc, curr) => [...acc, ...curr]) // merge arrays
    )
  ].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())) // ignore case

  // Create a sorted list of all unique sources
  const sources = [
    ...new Set(
      tutorials.map(tutorial => (tutorial.node.source ? tutorial.node.source : ''))
    )
  ].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())) // ignore case

  return (
    <Base>
      <main className="bg-near-white min-vh-75 sans-serif">
        <Directory
          tutorials={tutorials}
          formats={formats}
          topics={topics}
          authors={authors}
          sources={sources}
        />
      </main>
    </Base>
  )
}

///////////////////////////////////////////////////////////////////////////////////

import React from 'react'

import Base from '../components/Base'
import Directory from '../components/Directory'
import useTutorialsData from '../queries/useTutorialsData'

export default IndexPage
