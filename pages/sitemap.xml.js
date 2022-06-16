import React from 'react'
// const fs = require('fs')
import {fetchPosts} from "../src/components/features/post/postAPI"
// import { globby } from "globby"

// const addPage = page => {
//   const path = page.replace("pages", "").replace(".js", "").replace(".mdx", "")
//   const route = path === "/index" ? "" : path

//   return `<url>
//       <loc>${`${process.env.NEXT_PUBLIC_SITE_URL}${route}`}</loc>
//     </url>`
// }

const createSitemap = posts => {
  //   const pages = await globby([
  //     "pages/**/*{.js,.mdx}",
  //     "!pages/_*.js",
  //     "!pages/api",
  //   ])
  //   const sitemap = `${pages.map(addPage).join("\n")}`

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
       <loc>https://writeonce.dev/bookmarks</loc>
    </url>
    <url>
        <loc>https://writeonce.dev/drafts</loc>
    </url>
    <url>
        <loc>https://writeonce.dev</loc>
    </url>
    <url>
        <loc>https://writeonce.dev/post</loc>
    </url>
    <url>
        <loc>https://writeonce.dev/signin</loc>
    </url>
        ${posts
          .map(({slug}) => {
            return `
                <url>
                    <loc>${`${process.env.NEXT_PUBLIC_SITE_URL}/${slug}`}</loc>
                    <changefreq>daily</changefreq>
                </url>
            `
          })
          .join("")}
    </urlset>
    `
}

class Sitemap extends React.Component {
  static async getInitialProps({res}) {
    const allPosts = await fetchPosts()

    res.setHeader("Content-Type", "text/xml")
    res.write(createSitemap(allPosts))
    res.end()
  }
}

export default Sitemap
