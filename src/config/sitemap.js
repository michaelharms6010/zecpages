import path from 'path'
import sm from 'sitemap'
import fs from 'fs'

import config from '.'

const OUTPUT_FILE = path.resolve(__dirname, '..', '..', 'public', 'sitemap.xml')


const sitemap = sm.createSitemap({
    hostname: 'https://zecpages.com',
    cacheTime: 600000, //600 sec (10 min) cache purge period
    urls: [
      { url: '/', changefreq: 'weekly', priority: 1 },
      { url: '/directory', changefreq: 'weekly', priority: 0.5 },
      { url: '/about', changefreq: 'weekly', priority: 0.5 }
    ]
})

fs.writeFileSync(OUTPUT_FILE, sitemap.toString())

console.log(`Sitemap written at ${OUTPUT_FILE}`)