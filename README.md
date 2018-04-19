# :blue_book: gatsby-starter-skinny-docs

#### this project was inspired by [`gatsby-starter-docs`](https://github.com/ericwindmill/gatsby-starter-docs)

A simplified starter just for documentation/demo sites built with [Gatsby](https://github.com/gatsbyjs/gatsby/).

### Quick Start

```
gatsby new great-docs-site https://github.com/graysonhicks/gatsby-starter-skinny-docs
```

```
cd greats-docs-site
```

```
npm install && gatsby develop
```

##### Table of Contents

* Install
  * [Install](#install)
  * [Get Started](#get-started)
* Development
  * [Development](#development)
  * [Building](#building)
  * [Deploying](#deploying)
* How It Works
  * [Basic Data Flow](#basic-data-flow)
  * [table_of_contents.json](#table_of_contentsjson)
  * [gatsby-node.js](#gatsby-nodejs)
  * [TableOfContents Component](#tableofcontents-component)
  * [Home Page](#home-page)
  * [Demo Page](#demo-page)
* Gatsby Specific
  * [Plugins](#plugins)
  * [Source](#source)
  * [Transformers](#transformers)
* Credits and Contributing
  * [Credits](#credits)
  * [Contributing](#contributing)

## [Demo](https://graysonhicks.github.io/gatsby-starter-skinny-docs/)

## Install

### Install

To get started with `gatsby-starter-skinny-docs` run this in the directory where you want to start a new docs site:

```
gatsby new great-docs-site https://github.com/graysonhicks/gatsby-starter-skinny-docs
```

This command will clone the git repo. Now to get your site up and running.

### Get Started

Now that you have cloned the repo, install the dependencies and run this to start the Gatsby development server:

```
cd [YOUR-DIRECTORY]
```

```
npm install
```

```
gatsby develop
```

Head to http://localhost:8000/ to see the starter site. Start editing/deleting the starter Markdown files or styles to your liking. Next, we need to explore the basic development process of Gatsby.

## Development

### Development

This project only comes with the default `gatsby develop` script running, but has an alias set up in case you want to add in any additional tools for development mode.

The command `npm run develop` is aliased to `gatsby develop` so you could add to that script e.g. `gatsby develop && npm run my-script`

## Building

This project only comes with several `build` scripts.

1.  `gatsby build` - The default Gatsby build script
2.  `npm run build` - Alias that by default only calls `gatsby build` but can be added to for additional build steps.
3.  `npm run build:pp` - The Gatsby build script with the [`--prefix-paths`](https://www.gatsbyjs.org/docs/path-prefix/) flag.

## Deploying

This project comes with several options for deployment.

1.  `npm run deploy` - This script cleans the old built site, uses `gatsby build` for a fresh build, and deploys to Github Pages. You can add other scripts in here if you wish.
2.  `npm run deploy:gh` - Uses the `gh-pages` package to publish the `public` folder to Github Pages. Can be run independent of `npm run deploy` or removed.
3.  Whatever you like. The project is flexible for adding Netlify, S3, or any other hosting solution you like by hooking into the deploy script.

## How It Works

### Basic Data Flow

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

### table_of_contents.json

#### Intro

The [`table_of_contents.json`](https://github.com/graysonhicks/gatsby-starter-skinny-docs/blob/master/src/docs/table_of_contents.json) file is where you provide the structure for your documentation, and content for its navigation. It relies on Gatsby's [gatsby-transformer-remark](https://www.gatsbyjs.org/packages/gatsby-transformer-remark/) to parse Markdown files. It is queried in the [`templates/doc.jsx`](https://github.com/graysonhicks/gatsby-starter-skinny-docs/blob/master/src/templates/doc.jsx) page and passed the data into the [`<TableOfContents / >`](/table-of-contents-component) component.

#### Parts

Main parts of the `json` file and their purpose:

`chapters` - Top-level structure. If a `chapter` is listed, then a corresponding `subchapter` is required. Not a link by default.

`subchapters` - Mid-level structure. If a `subchapter` is listed, then a corresponding `section` is required. Not a link by default.

`sections` - Bottom-level structure. Requires a `post` property that points to the corresponding Markdown file. The path to the Markdown file is relative to the `table_of_contents.json`. This is a link by default to the `slug` it's corresponding Markdown post.

#### Entry Point to Gatsby

The `table_of_contents.json` is accessible to Gatsby through the [gatsby-source-filesystem](https://www.gatsbyjs.org/packages/gatsby-source-filesystem/#gatsby-source-filesystem) plugin that is configured in this project's `gatsby-config.js` by this snippet:

```javascript
{
    resolve: 'gatsby-source-filesystem',
    options: {
    name: 'docs',
    path: `${__dirname}/src/docs/`,
    },
},
```

If you want to move it, you must change the `path` above as well.

#### Transforming

After this initial entry point by `gatsby-source-filesystem`, a transformer that is installed, called `gatsby-transformer-remark` parses any Markdown files the filesystem finds and transforms them into special objects with unique fields and properties not available just as a .md file. This is important in the `gatsby-node.js` file, as we add a slug field.

#### Querying

Because of the above snippet, the `table_of_contents.json` is now queriable by Gatsby wherever you may need it.

By default, this query happens in the `templates/doc.jsx` file and looks like this:

```javascript
tableOfContents: docsJson {
      possibleProp
      chapters {
        title
        subchapters {
          title
          sections {
            post {
              childMarkdownRemark {
                fields {
                  slug
                }
                frontmatter {
                  title
                }
              }
            }
          }
        }
      }
    }
```

Note that you may add other fields to your Table of Contents items. The `childMarkdownRemark` is created in the `gatsby-node.js` file.

#### Example

Here is an example of how a multi-chapter Table of Contents could be set up:

```javascript
{
  "id": "table-of-contents",
  "possibleProp": "possibleVal",
  "chapters": [
    {
      "title": "Chapter 1",
      "subchapters": [
        {
          "title": "Subchapter 1",
          "sections": [
            {
              "post": "./sub-1-section-1.md"
            },
            {
              "post": "./sub-1-section-2.md"
            }
          ]
        },
        {
          "title": "Subchapter 2",
          "sections": [
            {
              "post": "./sub-2-section-1.md"
            },
            {
              "post": "./sub-2-section-2.md"
            }
          ]
        }
      ]
    },
    {
      "title": "Chapter 2",
      "subchapters": [
        {
          "title": "Subchapter 1",
          "sections": [
            {
              "post": "./ch-2-sub-1-section-1.md"
            },
            {
              "post": "./ch-2-sub-1-section-2.md"
            }
          ]
        }
      ]
    }
  ]
}
```

### gatsby-node.js

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

### TableOfContents Component

The `<TableOfContents / >` React component is what receives the queried data from `table_of_contents.json` and loops over to build the nested left nav of Chapters, Subchapters, and Sections. It lives inside the `doc.jsx` file.

Because it is build of `styled-components`, it is completely stylable to your needs. You may also make use of the `ThemeProvider` that is set up with `gatsby-starter-skinny-docs`.

It is very customizable if you choose to pass additional fields from `table_of_contents.json` and access them within this component..

It relies entirely on the structure of the `table_of_contents.json` file to stay virtually the same. So be prepared for changes in several files if you wish to make structural changes to the Chapter/Subchapter/Section design.

By default, it looks like this:

```javascript
class TableOfContents extends React.Component {
  render() {
    const chapters = this.props.posts.chapters;
    return (
      <TableOfContentsContainer>
        {chapters.map(chapter => (
          <Chapter chapter={chapter}>
            {chapter.subchapters.map(subchapter => (
              <Subchapter subchapter={subchapter}>
                {subchapter.sections.map(({ post }) => (
                  <Section section={post} />
                ))}
              </Subchapter>
            ))}
          </Chapter>
        ))}
      </TableOfContentsContainer>
    );
  }
}
```

### Home Page

The home page (`pages/index.jsx`) is where you can build your landing page with React components to feature your team or tool as you see fit.

It is not a Markdown file by default, but a full-fledged React page.

### Demo Page

The `Demo` page (`pages/demo.jsx`) is where you can build a page to showcase your library/tool in action.

It is not a Markdown file by default, but a full-fledged React page.

## Gatsby Specific

### Plugins

List of Gatsby `plugins` used and links to their documentation. Other plugins can be added to the project as needed.

#### [gatsby-plugin-react-helmet](https://www.gatsbyjs.org/packages/gatsby-plugin-react-helmet/#gatsby-plugin-react-helmet)

Used to build site metadata.

#### [gatsby-plugin-styled-components](https://www.gatsbyjs.org/packages/gatsby-plugin-styled-components/#gatsby-plugin-styled-components)

Allows for the use of `styled-components` in Gatsby.

#### [gatsby-plugin-react-next](https://www.gatsbyjs.org/packages/gatsby-plugin-react-next/#gatsby-plugin-react-next)

Allows for the use of React v16 and its features in Gatsby.

#### [gatsby-plugin-sharp](https://www.gatsbyjs.org/packages/gatsby-plugin-sharp/#gatsby-plugin-sharp)

Gatsby image processing library for responsive images. Works with [`gatsby-transformer-sharp`](https://www.gatsbyjs.org/packages/gatsby-transformer-sharp/#gatsby-transformer-sharp).

#### [gatsby-plugin-google-fonts](https://www.npmjs.com/package/gatsby-plugin-google-fonts)

Inserts a `<link>` tag for Google fonts in `<head>`. There are other ways to use Google fonts with Gatsby, so this one may be removed if desired.

#### [gatsby-plugin-catch-links](https://www.gatsbyjs.org/packages/gatsby-plugin-catch-links/#gatsby-plugin-catch-links)

Intercepts local links from markdown and other non-react pages and does a client-side pushState to avoid the browser having to refresh the page.

#### [gatsby-plugin-sitemap](https://www.gatsbyjs.org/packages/gatsby-plugin-sitemap/#gatsby-plugin-sitemap)

Creates a sitemap for your Gatsby site.

#### [gatsby-plugin-manifest](https://www.gatsbyjs.org/packages/gatsby-plugin-manifest/#gatsby-plugin-manifest)

Adds support for shipping a `manifest.json` with your site.

#### [gatsby-plugin-offline](https://www.gatsbyjs.org/packages/gatsby-plugin-offline/#gatsby-plugin-offline)

Adds drop-in support for making a Gatsby site work offline and more resistant to bad network connections.

### Source

List of Gatsby `source` used and links to their documentation.

#### [gatsby-source-filesystem](https://www.gatsbyjs.org/packages/gatsby-source-filesystem/#gatsby-source-filesystem)

Plugin for creating File nodes from the file system. In this case, we are using it for our entire `src/docs/` directory and our `images/` directory, to make those files available for querying with GraphQL.

### Transformers

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

## Credits and Contributing

### Credits

Thanks to the following projects for inspiration and direction:

* [GatsbyJS](https://www.gatsbyjs.org/)

  The reason for the party...

* [gatsby-advanced-starter](https://github.com/Vagr9K/gatsby-advanced-starter)

  Most of the Remark work was done here. Really good examples of many aspects of Gatsby here.

* [gatsby-starter-docs](https://github.com/ericwindmill/gatsby-starter-docs)

  I was inspired to make a slimmed down version of this. Itself a fork of `gatsby-advanced-starter`, the <TableOfContents / > component system started here. Has many more heavy-duty features for a full Gatsby site. (blog, tags, categories, etc.)

### Contributing

Any and all input for this project is welcome. Found a bug? Something not working? Have an idea?

Please reach out, fork, PR, and help make it better.

Thanks!
