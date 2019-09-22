exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'TutorialsYaml') {
    createNodeField({
      node,
      name: `authorsAsString`,
      value: node.authors ? node.authors.join(` `) : ``
    })

    createNodeField({
      node,
      name: `formatsAsString`,
      value: node.formats ? node.formats.join(` `) : ``
    })

    createNodeField({
      node,
      name: `topicsAsString`,
      value: node.topics ? node.topics.join(` `) : ``
    })
  }
}
