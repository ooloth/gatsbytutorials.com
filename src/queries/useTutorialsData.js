function useTutorialsData() {
  const { tutorialsWithDates, tutorialsWithoutDates } = useStaticQuery(
    graphql`
      query {
        tutorialsWithDates: allTutorialsYaml(
          filter: { date: { ne: null } }
          sort: { fields: [date], order: DESC }
        ) {
          edges {
            node {
              title
              link
              formats
              date(formatString: "MMM DD, YYYY")
              length
              authors
              source
              topics
            }
          }
        }

        tutorialsWithoutDates: allTutorialsYaml(
          filter: { date: { eq: null } }
          sort: { fields: [title], order: ASC }
        ) {
          edges {
            node {
              title
              link
              formats
              language
              date(formatString: "MMM DD, YYYY")
              length
              authors
              source
              topics
            }
          }
        }
      }
    `
  )

  return [tutorialsWithDates.edges, tutorialsWithoutDates.edges]
}

///////////////////////////////////////////////////////////////////////////////////

import { useStaticQuery, graphql } from 'gatsby'

export default useTutorialsData
