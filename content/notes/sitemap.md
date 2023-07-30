Incostintecy between rendered `/sitemap.xml` and `./output/public/sitemap.xml` file

I have a nuxt project with i18n v8, with 3 languages: en, es, pt and only 3 static routes: `index`, `history` and `legal.vue` and `NUXT_PUBLIC_SITE_URL` env var set to `http://localhost:3000`.

I'm noticing a few things not working correctly:

1. The url is `http://localhost:3000` in the rendered `/sitemap.xml` but if I inspect the `./output/public/sitemap.xml` file the url is `https://false`. This is both for the static and dynamic routes.

2. In the `./output/public/sitemap.xml` file, for the index page, hreflang are added only for `es` but not for `en` and `pt`:

```xml
    <url>
        <lastmod>2023-07-30T01:52:21+00:00</lastmod>
        <loc>https://false/en</loc>
    </url>
    <url>
        <xhtml:link rel="alternate" hreflang="en" href="https://false/en" />
        <xhtml:link rel="alternate" hreflang="pt" href="https://false/pt" />
        <loc>https://false/es</loc>
        <lastmod>2023-07-30T01:52:21+00:00</lastmod>
    </url>
    <url>
        <lastmod>2023-07-30T01:52:21+00:00</lastmod>
        <loc>https://false/pt</loc>
    </url>
```
And in `/api/__sitemap__/debug` I only see:
```json

```
