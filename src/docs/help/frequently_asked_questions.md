---
title: "Frequently Asked Questions"
---

#### Can I add a blog?

With Gatsby's flexibility, you could certainly add blog functionality to this starter. That being said, the [`gatsby-starter-docs`](https://github.com/ericwindmill/gatsby-starter-docs) that inspired this is itself based on the [`gatsby-starter-advanced`](https://github.com/Vagr9K/gatsby-advanced-starter) which has more robust support for a blog out of the box.

#### What about another docs type structure for tutorials with the Table of Contents structure?

Great idea, and something I thought about including out of the box! This would basically be achieved by replicating the code that builds the `Docs` page, but namespacing it as `Tutorials` (or whatever else). You could then reuse the `<TableOfContents / >` component but pass in the Tutorials data instead.
