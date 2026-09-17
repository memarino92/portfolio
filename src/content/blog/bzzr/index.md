---
title: "bzzr"
description: "A tale of open source, nostalgia, and necessity."
pubDate: 2026-09-17
tags: []
draft: false
---

Redwood's always held a special place in my heart. It was my first open source contribution (link here), a one-line fix to the starter page css. RedwoodJS coptured my attention early into my web development journey (NOT journey, some other word), and through their excellent docs and tutorials I was able to learn a lot and have it serve as the introduction to many concepts - React, GraphQL, tailwind, storybook, component testing. It also introduced me to Railway which is one of my favorite places to host apps (not affiliated).

A little over a year ago, Redwood rebranded itself as Redwood SDK. It billed itself as the full-stack react metaframework for building on Cloudflare. Conventinos and docs on how do do things the redwood way, and take advantage of a full gamut of Cloudflare offerings - notable to me was realtime multiplayer support baked in via Durable Objects. Explorign the docs for the first time, My mind immidiately went to a Jeopardy-style game. It seemed like the perfect fit, so of course I needed a name.

Well, my first several domain choices weren't available, but eventualy I landed on bzzr.app, which WAS available, and I liekd better than the one's I'd tried to get earlier anyway. So with domain in hand, I git init-ed and `npx create`-ed my way to a new Redwood SDK Hello World app, which I deployed to the live domain.

Where it sat, untouched, for about a year.

Recently I was inspired to pick back up where I left off. Redwood recently hit its 1.0 milestone, and it seemed as good a fit as ever to tackle the buzzer challenge.

As Tailwind-brained as I am, half the reason I chose it is so that I could base some of my UI elements around bits from Tailwind Plus UI elemetns. I'm no designer, but Steve Soger sure is, so I'll leverage his work whenever possible.

Storybook was also a deliberate choice here. Since I'd be building this with the help of AI I wanted an easy way to workshop and iterate components to capture the exact look and feel of the app I could see in my head, and also a nod to its heavy featuring in the original RedwoodJS framework and tutorials.

The key to the whole game function is the durable object that acts as the store for the room. They're ephemeral, spun up dynamically for each room instance and automatically cleaned up after a set amoutn of time, whether that be an inactivity threshold or a hardcoded limit. Each connected client maintains a websocket connection to the server, allowing live updates with minimal overhead, and the DO reamians on CF infrastructure to act as "the server". Since each room gets its own whole instance, though, we don't need to worry about writing the correlation code or keeping a thread-safe collectino like we might have to do if we were writing this on a solitary server.

At its heart it's a very simple app. There's always time to add stuff in later, but this fills a gap that I coundl't find another good match. Free, easy to use, no accout, no downlaod, just send your friends a link or have them scan a QR code and your off to the races. Host creates and then controlls the room, with the ability to boot or ban players. Up to 60 players per room. Open in spectator mode to put on a separate screen or projector. Toggle left-handed mode if you're a freak.
