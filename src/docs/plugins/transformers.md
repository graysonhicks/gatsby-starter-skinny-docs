---
title: "Transformers"
---

List of Gatsby `transformers` used and links to their documentation.

#### [gatsby-transformer-sharp](https://www.gatsbyjs.org/packages/gatsby-source-filesystem/#gatsby-source-filesystem)

Creates ImageSharp nodes from image types that are supported by the Sharp image processing library and provides fields in their GraphQL types for processing your images in a variety of ways including resizing, cropping, and creating responsive images. Works with [`gatsby-plugin-sharp`](https://www.gatsbyjs.org/packages/gatsby-plugin-sharp/#gatsby-plugin-sharp).

#### [gatsby-transformer-json](https://www.gatsbyjs.org/packages/gatsby-transformer-json/#gatsby-transformer-json)

Parses raw JSON strings into JavaScript objects e.g. from JSON files. Supports arrays of objects and single objects. This is used for parsing the `table_of_contents.json` file but with it enabled, any JSON file can be used in your project.

#### [gatsby-transformer-remark](https://www.gatsbyjs.org/packages/gatsby-transformer-remark/#gatsby-transformer-remark)

Parses Markdown files using [Remark](https://remark.js.org/). Much of this project relies on this transformer, which also has its own list of plugins here:

* ##### [gatsby-remark-images](https://www.gatsbyjs.org/packages/gatsby-remark-images/#gatsby-remark-images)

Processes images in markdown so they can be used in the production build.

* ##### [gatsby-remark-responsive-iframe](https://www.gatsbyjs.org/packages/gatsby-remark-responsive-iframe/#gatsby-remark-responsive-iframe)

Wraps iframes or objects (e.g. embedded YouTube videos) within markdown files in a responsive elastic container with a fixed aspect ratio.

* ##### [gatsby-remark-prismjs](https://www.gatsbyjs.org/packages/gatsby-remark-prismjs/#gatsby-remark-prismjs)

Adds syntax highlighting to code blocks in markdown files using [PrismJS](http://prismjs.com/).

* ##### [gatsby-remark-copy-linked-files](https://www.gatsbyjs.org/packages/gatsby-remark-copy-linked-files/#gatsby-remark-copy-linked-files)

Copies local files linked to/from markdown to your public folder.

* ##### [gatsby-remark-autolink-headers](https://www.gatsbyjs.org/packages/gatsby-remark-autolink-headers/#gatsby-remark-autolink-headers)

Adds GitHub-style hover links to headers in your markdown files when they’re rendered.
