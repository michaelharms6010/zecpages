console.log('hi')

import path from 'path'
import sm from 'sitemap'
import fs from 'fs'
import axios from 'axios';
import { Readable } from 'stream'
const baseURL = "https://be.zecpages.com"

let postIds, usernames;

// get post ids
// get usernames
axios.get(baseURL + "/board/postids").then(r => {
  console.log(r)
  postIds = r.data.posts;
  postIds.reverse();

axios.get(baseURL + "/users/getUsernames").then(r => {
  console.log(r)
  usernames = r.data.usernames;



const OUTPUT_FILE = path.resolve(process.cwd(), '..', '..', 'public', 'sitemap.xml')
console.log(OUTPUT_FILE)
const stream = new sm.SitemapStream({ hostname: 'https://zecpages.com/' })
const links = [{ url: '/',  changefreq: 'daily', priority: 1 },
{ url: '/directory',  changefreq: 'weekly',  priority: 0.6 },
{ url: '/about', changefreq: 'weekly',  priority: 0.1 }]

postIds.forEach((postId, index) => {
  links.push({ url: `/board/post/${postId}`,  changefreq: 'weekly', priority: index < 50 ? .5 : .3 })
})

usernames.forEach(username => {
  links.push({ url: `/${username}`,  changefreq: 'weekly', priority: .4 })
})

// todo - get sub boards


fs.writeFile('public/sitemap.xml', "", (err) => {
  if (err) throw err;

  console.log("The file was succesfully saved!");
});

sm.streamToPromise(Readable.from(links).pipe(stream)).then((data) =>

  fs.writeFileSync("public/sitemap.xml", data.toString())
)

console.log(`Sitemap written at ${OUTPUT_FILE}`)

}).catch(err => console.log(err))
}).catch(err => console.log(err))