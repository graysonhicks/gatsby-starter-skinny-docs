---
title: "gatsby-node.js"
---

The `gatsby-node.js` does the heavy lifting for building the docs pages from the `table_of_contents.json`.

To understand the `gatsby-node` file in general, read [this](https://www.gatsbyjs.org/docs/node-apis/#gatsby-node-apis) first.

In our case, we are implementing two of these APIs by default: [`onCreateNode`](https://www.gatsbyjs.org/docs/node-apis/#onCreateNode) and [`createPages`](https://www.gatsbyjs.org/docs/node-apis/#createPages). I recommend reading their docs and examples linked there.

#### onCreateNode

The `onCreateNode` hook is called when a node is created. Nn this case we are trying to add a field for the slug on each `MarkdownRemark` node. This slug is useful for the querying and filtering that we use in the `doc.jsx` template. So first, we grab each node that has been created from our `gatsby-transformer-remark` created nodes from the `gatsby-source-filesystem`, like this:

```javascript
  if (node.internal.type === 'MarkdownRemark')
```

Once we have that node, we are going to use a process described in the Gatsby docs for adding the slug field mentioned above. A link to that method is [here](https://github.com/gatsbyjs/gatsby/blob/master/docs/docs/migrating-from-v0-to-v1.md#create-slugs-for-markdown-files). In our case, we will also be testing the Markdown file for a title or slug that has been defined in `frontmatter`, and using that first.

```javascript
if (node.internal.type === 'MarkdownRemark') {
  const fileNode = getNode(node.parent);
  const parsedFilePath = path.parse(fileNode.relativePath);
  if (
    Object.prototype.hasOwnProperty.call(node, 'frontmatter') &&
    Object.prototype.hasOwnProperty.call(node.frontmatter, 'slug')
  ) {
    slug = `/${_.kebabCase(node.frontmatter.slug)}`;
  }
  if (
    Object.prototype.hasOwnProperty.call(node, 'frontmatter') &&
    Object.prototype.hasOwnProperty.call(node.frontmatter, 'title')
  ) {
    slug = `/${_.kebabCase(node.frontmatter.title)}`;
  } else if (parsedFilePath.name !== 'index' && parsedFilePath.dir !== '') {
    slug = `/${parsedFilePath.dir}/${parsedFilePath.name}/`;
  } else if (parsedFilePath.dir === '') {
    slug = `/${parsedFilePath.name}/`;
  } else {
    slug = `/${parsedFilePath.dir}/`;
  }
  createNodeField({ node, name: 'slug', value: slug });
}
```

You really should not need to mess with this unless you want to alter the way your slugs are defined.

#### createPages

This hook fires after all source and transforming has been done on the nodes and allows you to query that data and build pages with it.

First, we tell Gatsby the template we want to use for these pages, in our case it's our `doc.jsx` page.

```javascript
const docPage = path.resolve('src/templates/doc.jsx');
```

In this portion of the code, we are querying our data for the information we need to build the page:

```javascript
    resolve(
      graphql(
        `
          query {
            allMarkdownRemark {
              edges {
                node {
                  frontmatter {
                    title
                  }
                  fields {
                    slug
                  }
                }
              }
            }
          }
        `
      )
```

In its callback, we are looping over each Markdown page that returned from the query and using Gatsby's native `createPage` function to create the page, and referencing the template we defined above:

```javascript
result.data.allMarkdownRemark.edges.forEach(edge => {
  createPage({
    path: edge.node.fields.slug,
    component: docPage,
    context: {
      slug: edge.node.fields.slug,
    },
  });
});
```

This `createPages` can definitely be modified to pass more information from the Markdown to the React template.
