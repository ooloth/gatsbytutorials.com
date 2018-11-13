function Base({ children }) {
  return (
    <StaticQuery
      query={graphql`
        query {
          site {
            siteMetadata {
              description
              language
              locale
              title
              twitterHandle
              siteUrl
            }
          }
          gatsbyIcon: file(relativePath: { eq: "images/favicon.png" }) {
            childImageSharp {
              fluid(maxWidth: 80) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          tutorials: allTutorialsYaml {
            edges {
              node {
                title
              }
            }
          }
        }
      `}
      render={data => (
        <>
          <SiteMetadata site={data.site.siteMetadata} />
          <Header icon={data.gatsbyIcon} count={data.tutorials.edges.length} />
          {children}
          <Footer />
        </>
      )}
    />
  )
}

/*
 *
 * Global styles & preloaded static assets
 *
 */

import '../styles/index.css'

/*
 *
 * Metadata
 *
 */

import siteImage from '../images/favicon.png'

function SiteMetadata({ site }) {
  return (
    <Helmet>
      {/* HTML language */}
      <html itemScope itemType="http://schema.org/WebPage" lang={site.language} />

      {/* Title comes first (meta charset and viewport are automatically included) */}
      <title itemProp="name" lang={site.language}>
        {site.title}
      </title>

      {/* Search engine */}
      <meta name="description" content={site.description} />
      <meta name="image" content={site.siteUrl + siteImage} />
      <link rel="canonical" href={site.siteUrl} />

      {/* Preconnect to external data sources */}
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <link rel="preconnect" href="https://cdnjs.cloudflare.com" />

      {/* Schema.org for Google */}
      <meta itemProp="name" content={site.title} />
      <meta itemProp="description" content={site.description} />
      <meta itemProp="image" content={site.siteUrl + siteImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={site.title} />
      <meta name="twitter:description" content={site.description} />
      <meta name="twitter:image" content={site.siteUrl + siteImage} />

      {/* Open Graph general (Facebook, Pinterest, Slack & Google+) */}
      <meta property="og:title" content={site.title} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={site.siteUrl} />
      <meta property="og:image" content={site.siteUrl + siteImage} />
      <meta property="og:description" content={site.description} />
      <meta property="og:site_name" content={site.title} />
      <meta property="og:locale" content={site.locale} />

      {/* Non-essential, but required for analytics */}
      {site.facebookAppId && (
        <meta property="fb:app_id" content={site.facebookAppId} />
      )}
      {site.twitterHandle && (
        <meta name="twitter:site" content={site.twitterHandle} />
      )}
    </Helmet>
  )
}

/*
 *
 * Imports & Exports
 *
 */

import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Helmet from 'react-helmet'
import { setConfig } from 'react-hot-loader' // TODO: remove when HMR useState bug fixed
setConfig({ pureSFC: true }) // TODO: remove when HMR useState bug is fixed

import Header from '../components/Header'
import Footer from '../components/Footer'

export default Base
