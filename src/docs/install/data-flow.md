---
title: "Basic Data Flow"
---

The basic data flow for this starter can be illustrated like this:

`table_of_contents.json`

&downarrow;

`gatsby-source-filesystem`

&downarrow;

`gatsby-transformer-remark`

&downarrow;

`gatsby-node.js` (onCreateNode)

&downarrow;

`gatsby-node.js` (createPages)

&downarrow;

`GraphQl query in doc.jsx`

&downarrow;

`TableOfContents component`
