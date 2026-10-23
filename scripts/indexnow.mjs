// Ping IndexNow (Bing, Yandex, Seznam, Naver…) after a production deploy so new pages are recrawled.
// Usage: node scripts/indexnow.mjs [path ...]   (defaults to the pages in the sitemap)
const HOST = "www.jesseqin.me";
const KEY = "d93a347e66aa8b7cdeda225ba2d15408";
const paths = process.argv.slice(2).length ? process.argv.slice(2) : ["/", "/ai-usage", "/projects", "/llms.txt", "/llms-full.txt"];

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList: paths.map((path) => `https://${HOST}${path}`),
  }),
});
console.log(`IndexNow: ${response.status} ${response.statusText}`);
