webpackJsonp([0x983d52649bee],{924:function(n,s){n.exports={data:{site:{siteMetadata:{siteTitle:"gatsby-starter-skinny-docs",siteTitleAlt:"A Skinny Gatsby Starter Template for Creating Docs",siteDescription:"Get your docs site up and going with Gatsby.",siteFullUrl:null,siteLogo:"/logos/logo.png",siteFBAppID:"optional facebook app id for open graph in SEO.jsx",siteTwitterId:"@graysonhicks"}},postBySlug:{html:'<p>The <code>gatsby-node.js</code> does the heavy lifting for building the docs pages from the <code>table_of_contents.json</code>.</p>\n<p>To understand the <code>gatsby-node</code> file in general, read <a href="https://www.gatsbyjs.org/docs/node-apis/#gatsby-node-apis">this</a> first.</p>\n<p>In our case, we are implementing two of these APIs by default: <a href="https://www.gatsbyjs.org/docs/node-apis/#onCreateNode"><code>onCreateNode</code></a> and <a href="https://www.gatsbyjs.org/docs/node-apis/#createPages"><code>createPages</code></a>. I recommend reading their docs and examples linked there.</p>\n<h4 id="oncreatenode"><a href="#oncreatenode" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>onCreateNode</h4>\n<p>The <code>onCreateNode</code> hook is called when a node is created. Nn this case we are trying to add a field for the slug on each <code>MarkdownRemark</code> node. This slug is useful for the querying and filtering that we use in the <code>doc.jsx</code> template. So first, we grab each node that has been created from our <code>gatsby-transformer-remark</code> created nodes from the <code>gatsby-source-filesystem</code>, like this:</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code>  <span class="token keyword">if</span> <span class="token punctuation">(</span>node<span class="token punctuation">.</span>internal<span class="token punctuation">.</span>type <span class="token operator">===</span> <span class="token string">\'MarkdownRemark\'</span><span class="token punctuation">)</span>\n</code></pre>\n      </div>\n<p>Once we have that node, we are going to use a process described in the Gatsby docs for adding the slug field mentioned above. A link to that method is <a href="https://github.com/gatsbyjs/gatsby/blob/master/docs/docs/migrating-from-v0-to-v1.md#create-slugs-for-markdown-files">here</a>. In our case, we will also be testing the Markdown file for a title or slug that has been defined in <code>frontmatter</code>, and using that first.</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>node<span class="token punctuation">.</span>internal<span class="token punctuation">.</span>type <span class="token operator">===</span> <span class="token string">\'MarkdownRemark\'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> fileNode <span class="token operator">=</span> <span class="token function">getNode</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>parent<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token keyword">const</span> parsedFilePath <span class="token operator">=</span> path<span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>fileNode<span class="token punctuation">.</span>relativePath<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span>\n    Object<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>hasOwnProperty<span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>node<span class="token punctuation">,</span> <span class="token string">\'frontmatter\'</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>\n    Object<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>hasOwnProperty<span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>frontmatter<span class="token punctuation">,</span> <span class="token string">\'slug\'</span><span class="token punctuation">)</span>\n  <span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    slug <span class="token operator">=</span> <span class="token template-string"><span class="token string">`/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>_<span class="token punctuation">.</span><span class="token function">kebabCase</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>frontmatter<span class="token punctuation">.</span>slug<span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">`</span></span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span>\n    Object<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>hasOwnProperty<span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>node<span class="token punctuation">,</span> <span class="token string">\'frontmatter\'</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>\n    Object<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>hasOwnProperty<span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>frontmatter<span class="token punctuation">,</span> <span class="token string">\'title\'</span><span class="token punctuation">)</span>\n  <span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    slug <span class="token operator">=</span> <span class="token template-string"><span class="token string">`/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>_<span class="token punctuation">.</span><span class="token function">kebabCase</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>frontmatter<span class="token punctuation">.</span>title<span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">`</span></span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>parsedFilePath<span class="token punctuation">.</span>name <span class="token operator">!==</span> <span class="token string">\'index\'</span> <span class="token operator">&amp;&amp;</span> parsedFilePath<span class="token punctuation">.</span>dir <span class="token operator">!==</span> <span class="token string">\'\'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    slug <span class="token operator">=</span> <span class="token template-string"><span class="token string">`/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>parsedFilePath<span class="token punctuation">.</span>dir<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>parsedFilePath<span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/`</span></span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>parsedFilePath<span class="token punctuation">.</span>dir <span class="token operator">===</span> <span class="token string">\'\'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    slug <span class="token operator">=</span> <span class="token template-string"><span class="token string">`/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>parsedFilePath<span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/`</span></span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n    slug <span class="token operator">=</span> <span class="token template-string"><span class="token string">`/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>parsedFilePath<span class="token punctuation">.</span>dir<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/`</span></span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n  <span class="token function">createNodeField</span><span class="token punctuation">(</span><span class="token punctuation">{</span> node<span class="token punctuation">,</span> name<span class="token punctuation">:</span> <span class="token string">\'slug\'</span><span class="token punctuation">,</span> value<span class="token punctuation">:</span> slug <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>You really should not need to mess with this unless you want to alter the way your slugs are defined.</p>\n<h4 id="createpages"><a href="#createpages" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>createPages</h4>\n<p>This hook fires after all source and transforming has been done on the nodes and allows you to query that data and build pages with it.</p>\n<p>First, we tell Gatsby the template we want to use for these pages, in our case it\'s our <code>doc.jsx</code> page.</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">const</span> docPage <span class="token operator">=</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">\'src/templates/doc.jsx\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>In this portion of the code, we are querying our data for the information we need to build the page:</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code>    <span class="token function">resolve</span><span class="token punctuation">(</span>\n      <span class="token function">graphql</span><span class="token punctuation">(</span>\n        <span class="token template-string"><span class="token string">`\n          query {\n            allMarkdownRemark {\n              edges {\n                node {\n                  frontmatter {\n                    title\n                  }\n                  fields {\n                    slug\n                  }\n                }\n              }\n            }\n          }\n        `</span></span>\n      <span class="token punctuation">)</span>\n</code></pre>\n      </div>\n<p>In its callback, we are looping over each Markdown page that returned from the query and using Gatsby\'s native <code>createPage</code> function to create the page, and referencing the template we defined above:</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code>result<span class="token punctuation">.</span>data<span class="token punctuation">.</span>allMarkdownRemark<span class="token punctuation">.</span>edges<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>edge <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token function">createPage</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n    path<span class="token punctuation">:</span> edge<span class="token punctuation">.</span>node<span class="token punctuation">.</span>fields<span class="token punctuation">.</span>slug<span class="token punctuation">,</span>\n    component<span class="token punctuation">:</span> docPage<span class="token punctuation">,</span>\n    context<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n      slug<span class="token punctuation">:</span> edge<span class="token punctuation">.</span>node<span class="token punctuation">.</span>fields<span class="token punctuation">.</span>slug<span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>This <code>createPages</code> can definitely be modified to pass more information from the Markdown to the React template.</p>',timeToRead:3,excerpt:"The  gatsby-node.js  does the heavy lifting for building the docs pages from the  table_of_contents.json . To understand the  gatsby-node…",frontmatter:{title:"gatsby-node.js"}},tableOfContents:{possibleProp:"possibleVal",chapters:[{title:"Docs",subchapters:[{title:"Install",sections:[{post:{childMarkdownRemark:{fields:{slug:"/install"},frontmatter:{title:"Install"}}}},{post:{childMarkdownRemark:{fields:{slug:"/get-started"},frontmatter:{title:"Get Started"}}}}]},{title:"Development",sections:[{post:{childMarkdownRemark:{fields:{slug:"/development"},frontmatter:{title:"Development"}}}},{post:{childMarkdownRemark:{fields:{slug:"/building"},frontmatter:{title:"Building"}}}},{post:{childMarkdownRemark:{fields:{slug:"/deploying"},frontmatter:{title:"Deploying"}}}}]},{title:"How It Works",sections:[{post:{childMarkdownRemark:{fields:{slug:"/basic-data-flow"},frontmatter:{title:"Basic Data Flow"}}}},{post:{childMarkdownRemark:{fields:{slug:"/table-of-contents-json"},frontmatter:{title:"table_of_contents.json"}}}},{post:{childMarkdownRemark:{fields:{slug:"/gatsby-node-js"},frontmatter:{title:"gatsby-node.js"}}}},{post:{childMarkdownRemark:{fields:{slug:"/table-of-contents-component"},frontmatter:{title:"TableOfContents Component"}}}},{post:{childMarkdownRemark:{fields:{slug:"/home-page"},frontmatter:{title:"Home Page"}}}},{post:{childMarkdownRemark:{fields:{slug:"/demo-page"},frontmatter:{title:"Demo Page"}}}}]},{title:"Gatsby Specific",sections:[{post:{childMarkdownRemark:{fields:{slug:"/plugins"},frontmatter:{title:"Plugins"}}}},{post:{childMarkdownRemark:{fields:{slug:"/source"},frontmatter:{title:"Source"}}}},{post:{childMarkdownRemark:{fields:{slug:"/transformers"},frontmatter:{title:"Transformers"}}}}]},{title:"Credits and Contributing",sections:[{post:{childMarkdownRemark:{fields:{slug:"/credits"},frontmatter:{title:"Credits"}}}},{post:{childMarkdownRemark:{fields:{slug:"/contributing"},frontmatter:{title:"Contributing"}}}}]}]}]}},pathContext:{slug:"/gatsby-node-js"}}}});
//# sourceMappingURL=path---gatsby-node-js-9c01e8e1ef2042423193.js.map