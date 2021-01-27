console.log('hi')

import path from 'path'
import sm from 'sitemap'
import fs from 'fs'
import { Readable } from 'stream'



const OUTPUT_FILE = path.resolve(process.cwd(), '..', '..', 'public', 'sitemap.xml')
console.log(OUTPUT_FILE)
const stream = new sm.SitemapStream({ hostname: 'https://zecpages.com/' })
const links = [{ url: '/',  changefreq: 'daily', priority: 1 },
{ url: '/directory',  changefreq: 'weekly',  priority: 0.5 },
{ url: '/about', changefreq: 'weekly',  priority: 0.5 }]


fs.writeFile('newfile.txt', "", (err) => {
  if (err) throw err;

  console.log("The file was succesfully saved!");
});

sm.streamToPromise(Readable.from(links).pipe(stream)).then((data) =>

  fs.writeFileSync("build/sitemap.xml", data.toString())
)

console.log(`Sitemap written at ${OUTPUT_FILE}`)