// Show fallback content when JavaScript is not available (required by Lighthouse audit)

// Solution found here: https://github.com/gatsbyjs/gatsby/issues/9085#issuecomment-429580470

const React = require('react')

exports.onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents([
    <noscript key="noscript">
      To view Gatsby Tutorials, please enable JavaScript in your browser.
    </noscript>
  ])
}
