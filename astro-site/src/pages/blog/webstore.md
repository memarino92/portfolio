---
layout: ../../layouts/blogPost.astro
title: Building WebStore
client: Self
publishDate: 2022-03-18 00:00:00
img: https://res.cloudinary.com/mmarino/image/upload/e_art:sonnet,f_auto,q_auto/v1647571680/webstore_screenshot_lx9vbf.png
description: |
  Some thoughts on what I learned building an ecommerce app for a fictional book store
tags:
  - ecommerce
  - full stack
  - angular
  - typescript
  - .net
  - asp.net
  - c#
  - duende
  - identityserver
  - entity framework
  - sql server
  - docker
  - containers
  - git
  - github
  - netlify
  - railway
  - azure
  - google domains
  - cloudflare
  - cloudinary
  - let's encrypt
  - sendgrid
---

# Building WebStore

[View the source on GitHub](https://github.com/memarino92/WebStore)

## A New Paradigm

Not like a _new_ new paradigm. But definitely new to me!

Having spent most of my time learning and practicing web development focused on React and Node, taking on this project was a huge leap for me. It was absolutely necessary, though, to put me in the right position to move forward with my career in software development. It was a chance to prove to myself, and to my employer, that all of the skills that I have learned can indeed transfer to new frameworks and languages and that the foundation that I built can make me a productive member of any team.

The main goals in building this project were to demonstrate that I had the ability to stand up a moderately complex web app, including catalog, cart and checkout functionality, user authentication, and CRUD capabilities for creating new catalog items and users in an admin panel. It also served to familiarize myself with a lot of technologies that were fairly new to me, including Angular, Typescript, C#/.NET, and IdentityServer. It forced me into a deeper understanding of user authentication using standard protocols like OpenID Connect and OAuth2. It made me realize how, although there are many differences, there are also a lot of similarities between frameworks that aim accomplish the same tasks, even across languages.

### Angular vs. React

This is the first time I've set out to build something from scratch in Angular that wasn't based on a tutorial. There were certainly bumps along the way, but I tried to keep everything as idiomatic as possible: heavy use of RxJS, especially Observables; using Angular pipes to transform data and subscribe to and unsubscribe from Observables automatically; using services to move data around between nested components. There were a lot of similarities to React in overall approach - just start writing HTML, interpolate variables into the markup to display dynamic data, break off into separate components when you start to repeat yourself or when it makes sense for a component to contain its own logic. The big difference is in the implementaion details - passing around data and events, making calls to the API, how to handle client-side routing. Just like many of the skills I'd already learned helped me in this endeavor, I'm confident that the skills I learned here can be put to use in other projects as well. I'll be writing some more in the near future about the lessons I learned while building this project.
