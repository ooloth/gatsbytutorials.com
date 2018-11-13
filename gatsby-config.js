// Variables for gatsby-plugin-robots-txt:
const {
  NODE_ENV,
  URL: NETLIFY_SITE_URL = `https://www.gatsbytutorials.com`,
  DEPLOY_PRIME_URL: NETLIFY_DEPLOY_URL = NETLIFY_SITE_URL,
  CONTEXT: NETLIFY_ENV = NODE_ENV
} = process.env
const isNetlifyProduction = NETLIFY_ENV === `production`
const siteUrl = isNetlifyProduction ? NETLIFY_SITE_URL : NETLIFY_DEPLOY_URL

module.exports = {
  siteMetadata: {
    title: `Gatsby Tutorials`,
    description: `Gatsby Tutorials is a community-updated list of video, audio and written tutorials to help you learn GatsbyJS. 👩‍💻`,
    siteUrl: `https://www.gatsbytutorials.com`, // no slash at the end
    language: `en`,
    locale: `en_CA`,
    twitterHandle: ``,
    facebookAppId: ``
    // TODO: update siteImage variable in Base.js
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`
      }
    },
    `gatsby-plugin-postcss`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-yaml`,
    `gatsby-plugin-svgr`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-robots-txt`,
      // Disable crawlers for Netlify deploy-previews:
      options: {
        resolveEnv: () => NETLIFY_ENV,
        env: {
          production: {
            policy: [{ userAgent: `*` }]
          },
          'branch-deploy': {
            policy: [{ userAgent: `*`, disallow: [`/`] }],
            sitemap: null,
            host: null
          },
          'deploy-preview': {
            policy: [{ userAgent: `*`, disallow: [`/`] }],
            sitemap: null,
            host: null
          }
        }
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Tutorials`,
        short_name: `Gatsby Tuts`,
        start_url: `/`,
        // For splash screen when app launches:
        background_color: `#603894`,
        // For tool bar and task switcher:
        theme_color: `#603894`,
        display: `minimal-ui`,
        // Multiple icons will be generated for various devices.
        // Multiple favicons will be generated and added to each HTML page.
        // This path is relative to the root of the site.
        icon: `src/images/favicon.png`
      }
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-9710963-7',
        head: false, // Puts tracking script in the head instead of the body
        anonymize: true, // Setting this parameter is optional
        respectDNT: true // Setting this parameter is also optional
      }
    },
    `gatsby-plugin-netlify-cache`,
    {
      resolve: `gatsby-plugin-netlify`, // must come last
      options: {
        headers: {
          // First one is required for the HSTS list:
          '/*': [
            `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
          ],
          '/*.html': [`Cache-Control: public, max-age=0, must-revalidate`],
          '/*.js': [`Cache-Control: public, max-age=0, must-revalidate`],
          '/sw.js': [
            `Cache-Control: max-age=0, no-cache, no-store, must-revalidate`
          ],
          '/icons/*': [`Cache-Control: public,max-age=31536000,immutable`],
          '/static/*': [`Cache-Control: public,max-age=31536000,immutable`]
        }
      }
    }
  ]
}
