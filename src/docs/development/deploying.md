---
title: "Deploying"
---

This project comes with several options for deployment.

1.  `npm run deploy` - This script cleans the old built site, uses `gatsby build` for a fresh build, and deploys to Github Pages. You can add other scripts in here if you wish.
2.  `npm run deploy:gh` - Uses the `gh-pages` package to publish the `public` folder to Github Pages. Can be run independent of `npm run deploy` or removed.
3.  Whatever you like. The project is flexible for adding Netlify, S3, or any other hosting solution you like by hooking into the deploy script.
