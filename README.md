## Description

A ready to use, easy to customize [GatsbyJS](https://github.com/gatsbyjs/gatsby) personal blog starter with 'like app' layout transitions.

## Features:

- Customizable
- Easy editable content in Markdown files (posts, pages and parts)
- Easily restyled through theme object
- Styling with JSS
- Comments (Facebook)
- Post categories
- Post list filtering
- Full text searching (Algolia)
- Contact form (Netlify form handling)
- Material UI (@next)
- RSS feed
- Full screen mode
- User adjustable articles’ body copy font size
- Social sharing (Twitter, Facebook, Google, LinkedIn)
- PWA (manifest.json, offline support, favicons)
- Google Analytics
- Favicons generator (node script)
- Components lazy loading with AsyncComponent (social sharing, info box)
- ESLint (google config)
- Prettier code styling
- Custom webpack CommonsChunkPlugin settings
- Webpack BundleAnalyzerPlugin

## Prerequisites

If you do not have Gatsby Cli installed yet, do it first.

```text
npm install --global gatsby-cli
```

More information on [GatsbyJS.org](https://www.gatsbyjs.org/tutorial/part-one)

## Getting started

Install the starter using Gatsby Cli `gatsby new` command.

```text
gatsby new [NEW_SITE_DIRECTORY_FOR_YOUR_BLOG] https://github.com/greglobinski/gatsby-starter-personal-blog.git
```

Go into the newly created directory and run

```text
gatsby develop
```

to hot-serve your website on http://localhost:8000 or

```text
gatsby build
```

to create static site ready to host (/public).

##### External services

The starter uses external services for some functions: comments, searching, analytics. To use them you have to secure some access data. All services are free to use or have generous free tiers big enough for a personal blog.

Create an `.env` file like below in the root folder. Change `...` placeholders with real data.

```text
GOOGLE_ANALYTICS_ID=...
ALGOLIA_APP_ID=...
ALGOLIA_SEARCH_ONLY_API_KEY=...
ALGOLIA_ADMIN_API_KEY=...
ALGOLIA_INDEX_NAME=...
FB_APP_ID=...
```
