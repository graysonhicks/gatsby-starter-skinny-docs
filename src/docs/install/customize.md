---
title: "Customize"
---

Once you have gotten up and running, there will be lots of the demo content populated. The following files and directories welcome (need) your customization:

### Change

* `/src/docs` Put your Markdown files in here.
* `/src/docs/table_of_contents.json` Be sure that the structure of this is kept in sync with your Markdown files.
* `/src/styles/globalStyles.js` The styled-components tool for setting global styles.
* `/src/styles/theme.js` The styled-components theme used throughout the site.
* `/src/styles/css/code.css` The PrismJS for code block syntax highlighting.
* `/src/images` Add your images here (note that starter images are queried, so query would need to be removed or image replaced).
* `/src/pages` Add any pages you want here. You can make them pure React, or build another Markdown based page.
* `/src/demo` This page can be completely rewritten.
* `/src/components` Design and tweak this as you see fit (note that the `<TableOfContents / >` component is important so be careful with its functionality).

Other files like `gatsby-node.js` and `gatsby-config.js` are certainly customizable. Best idea is to familiarize yourself with [how it works](./basic-data-flow) first.

### Delete

The Demo page uses a few `npm` packages that you won't need. Run `npm run fresh` to uninstall these and reset the `demo.jsx` page.
