function useContributors() {
  const { allContributors } = useStaticQuery(
    graphql`
      query {
        allContributors {
          nodes {
            avatarImage {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            html_url
            id
            login
          }
        }
      }
    `
  )

  return allContributors.nodes
}

///////////////////////////////////////////////////////////////////////////////////

import { useStaticQuery, graphql } from 'gatsby'

export default useContributors
