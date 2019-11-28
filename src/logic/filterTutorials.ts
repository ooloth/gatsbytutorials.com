import { Tutorial } from '../types'

function fieldPassesFilter(
  field: Array<string> | string | undefined,
  filter: string
): boolean {
  if (!filter) return true // field always passes if filter isn't set
  if (!field) return false // field always fails if empty while filter is set

  if (typeof field === 'string') {
    return field.toLowerCase() === filter.toLowerCase()
  }

  return new Set(field).has(filter)
}

export default function filterTutorials(
  tutorials: Array<Tutorial>,
  format: string,
  topic: string,
  author: string,
  source: string
) {
  return tutorials.filter(item => {
    const passesFormatFilter = fieldPassesFilter(item.formats, format)
    const passesTopicFilter = fieldPassesFilter(item.topics, topic)
    const passesAuthorFilter = fieldPassesFilter(item.authors, author)
    const passesSourceFilter = fieldPassesFilter(item.source, source)

    return (
      passesFormatFilter &&
      passesTopicFilter &&
      passesAuthorFilter &&
      passesSourceFilter
    )
  })
}
