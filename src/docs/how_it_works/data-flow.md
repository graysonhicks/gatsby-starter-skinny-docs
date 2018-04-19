---
title: "Basic Data Flow"
---

Click on a step to be taken to further information on the part of the process where it occurs. The basic data flow for this starter can be illustrated like this:

1.  [`table_of_contents.json`](/table-of-contents-json)

You give structure and content for your docs and their navigation.

&downarrow;

2.  [`gatsby-source-filesystem`](/table-of-contents-json#entry-point-to-gatsby)

Gatsby pulls Markdown files in.

&downarrow;

3.  [`gatsby-transformer-remark`](/table-of-contents-json#transforming)

Remark transformer parses the Markdown files.

&downarrow;

4.  [`gatsby-node.js` (onCreateNode)](/gatsby-node-js#oncreatenode)

Nodes are available for manipulation in the `onCreateNode` hook. We add a new `slug` field.

&downarrow;

5.  [`gatsby-node.js` (createPages)](/gatsby-node-js#createPages)

Doc page nodes with new slug field are turned into pages with a template in the Gatsby `createPages` function.

&downarrow;

6.  [`GraphQl query in doc.jsx`](/table-of-contents-json#querying)

We query the data with GraphQL in our `doc.jsx` page.

&downarrow;

7.  [`TableOfContents component`](/table-of-contents-component)

The `<TableOfContents / >` component receives and renders the queried data.
