---
title: "bzzr"
description: "A tale of open source, nostalgia, and a domain I finally did something with."
pubDate: 2026-09-17
tags: ["redwoodsdk", "react", "cloudflare"]
draft: false
---

Redwood has always held a special place in my heart. My first open-source contribution was a one-line CSS fix to its starter page. Nothing earth-shattering, but it was my first little piece of someone else's project, and that stuck with me.

I found RedwoodJS early on when I was learning web development. Its docs and tutorials introduced me to React, GraphQL, Tailwind, Storybook, and component testing, with an actual app to tie everything together. It also introduced me to Railway, which is still one of my favorite places to host things. Not affiliated. Just a fan.

When RedwoodSDK came along, I was curious. React on Cloudflare, with Durable Objects in the mix, got me thinking about realtime multiplayer apps. My mind immediately went to a Jeopardy-style game. More specifically, the part where everyone insists they buzzed in first.

Obviously, before writing any code, I needed a domain.

My first several choices were taken, but eventually I landed on **bzzr.app**, which I liked better anyway. I scaffolded a RedwoodSDK app, deployed Hello World to my shiny new domain, and got to work.

About a year later.

With RedwoodSDK at 1.0, it felt like a good time to come back and give that domain something to do.

The idea was still small: a web buzzer for trivia nights. The host creates a room, friends join with a code, a link, or a QR code, and everyone gets a button to mash. No account, no download, no setup that takes longer than explaining the game. I hadn't found something that fit what I wanted, so I built it.

Keeping that scope was part of the appeal. You bring the questions and keep score however you like. bzzr handles who buzzed in and in what order. The host controls rounds and can play along, too.

The interesting technical decision was also the one that drew me to the project: **one Durable Object per room**. Everyone in a room connects to the same object over a WebSocket. It owns the room's state, accepts buzzes, and sends the resulting order back to everyone. RedwoodSDK brings React and the Cloudflare Worker together; the game's rules are my code.

That maps neatly to the game itself. Each group needs one place to settle what happened, and separate games don't need to know about each other. I don't have to build a shared room registry or coordinate room state across server instances. Cloudflare gives me that boundary, and I can concentrate on what happens inside it.

There's a tradeoff worth being clear about: buzz order is the order the server receives the buzzes. A player's browser doesn't get to claim first place based on its own clock. That gives everyone a consistent result, though it can't make everyone's network connection equally fast. For a casual trivia night, that's a tradeoff I'm comfortable with.

Rooms are temporary, too. They expire after inactivity or a fixed maximum lifetime, and their stored data is deleted. There's no reason for last night's buzzer order to become a permanent record.

On the UI side, I'm thoroughly Tailwind-brained. Part of the attraction was being able to start with components from Tailwind Plus and adapt them. I'm no designer, but Steve Schoger sure is, and I'm happy to have a head start.

Storybook was another deliberate choice, and a small nod to those original Redwood tutorials. I was building with AI assistance, and I wanted somewhere to work through the look and feel I had in mind. The same components used in the app can run through simulated rounds in Storybook, so I can iterate on the interface without assembling a room full of players every time. You can [poke around in the Storybook](https://storybook.bzzr.app) yourself.

There are a few comforts around that core: room for up to 60 players, host controls to remove disruptive players, and a spectator view for a separate screen or projector. There's even a left-handed mode. You're welcome.

Mostly, though, I wanted something you could pull up when someone says, "We need buzzers," and be playing a minute later.

The [source code is available on GitHub](https://github.com/memarino92/bzzr) under the MIT license. Clone it, modify it, make the design yours. Add chat and questions and build your own trivia SaaS app. Take it wherever you want! My first contribution to Redwood was one line of CSS; it'd be pretty cool if this became someone else's starting point.

[Give bzzr a try](https://bzzr.app). Trivia not included.
