import React from 'react'
import PropTypes from 'prop-types'

function Anchor({ href, srText, className, style, children }) {
  const isExternal = href.match(/http|\/\/|mailto:|tel:|pdf\//)

  return (
    <a
      href={href}
      onClick={e => e.stopPropagation()} // avoid firing parent event handlers
      target={isExternal ? `_blank` : null}
      rel={isExternal ? `noopener` : null}
      className={className}
      style={style}
    >
      {srText && <span className="sr-only">{srText}</span>}
      {children}
    </a>
  )
}

Anchor.propTypes = {
  href: PropTypes.string.isRequired,
  srText: PropTypes.string, // if anchor has no visible text
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.func,
    PropTypes.array
  ])
}

export default Anchor

/*

INSTRUCTIONS:

<Anchor href="" srText="" className="" style="">Link</Anchor>

- See: https://stackoverflow.com/questions/1369035/how-do-i-prevent-a-parents-onclick-event-from-firing-when-a-child-anchor-is-cli
- See: https://stackoverflow.com/questions/37568550/react-prevent-event-trigger-on-parent-from-child

*/
