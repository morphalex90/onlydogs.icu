# Onlydogs.icu

Dog photo wall built with Next.js (pages router). Photos come from [The Dog API](https://thedogapi.com).

    npm install
    npm run dev

## Environment

    DOG_API_KEY=...   # server-side key, never shipped to the browser

`NEXT_PUBLIC_CAT_API` is still read as a fallback for existing deployments, but new setups should use
`DOG_API_KEY`. The browser talks to `/api/images`, which proxies the request server-side.

## Pages

- `/`: home gallery, statically generated, revalidated every 12h
- `/breeds`: A–Z breed directory
- `/breed/<id>-<slug>`: per-breed gallery + breed facts
- `/category/<id>`: theme gallery
- `/sitemap.xml`: generated from the live category and breed lists
