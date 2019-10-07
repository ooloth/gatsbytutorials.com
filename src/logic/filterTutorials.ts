function filterTutorials(
  tutorials: Array<Tutorial>,
  format: string,
  topic: string,
  author: string,
  source: string
) {
  return tutorials.filter(item => {
    const isFormatMatch = format && item.formats && new Set(item.formats).has(format)
    const isTopicMatch = topic && item.topics && new Set(item.topics).has(topic)
    const isAuthorMatch = author && item.authors && new Set(item.authors).has(author)
    const isSourceMatch = source && item.source && new Set(item.source).has(source)

    return (
      (format ? isFormatMatch : true) &&
      (topic ? isTopicMatch : true) &&
      (author ? isAuthorMatch : true) &&
      (source ? isSourceMatch : true)
    )
  })
}

///////////////////////////////////////////////////////////////////////////////////

import { Tutorial } from '../types'

export default filterTutorials
