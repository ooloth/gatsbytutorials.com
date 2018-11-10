function PageMetadata({ page }) {
  return (
    <Helmet>
      {/* Page title */}
      <title itemProp="name">{page.title}</title>

      {/* Search engine */}
      <meta name="description" content={page.description} />
      <link rel="canonical" href={page.url} />

      {/* Schema.org for Google */}
      <meta itemProp="name" content={page.title} />
      <meta itemProp="description" content={page.description} />

      {/* Twitter */}
      <meta name="twitter:title" content={page.title} />
      <meta name="twitter:description" content={page.description} />

      {/* Open Graph (Facebook & Pinterest) */}
      <meta property="og:title" content={page.title} />
      <meta property="og:description" content={page.description} />
    </Helmet>
  )
}

/*
 *
 * Imports & Exports
 * 
 */

import React from 'react'
import Helmet from 'react-helmet'

export default PageMetadata
