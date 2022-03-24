---
layout: ../../layouts/blogPost.astro
title: Caesar's Box
publishDate: 2022-03-23T02:15:55.509Z
img: https://res.cloudinary.com/mmarino/image/upload/v1647744813/pb6xgpxuybahzvbcgnkt.webp
description: |
  Cracking ancient codes using modern tools
tags:
  - caesars box
  - code
  - cryptography
  - learn to program
  - BASIC
  - interplay
  - 90s
  - typescript
---

# Learn To Program BASIC

Published {new Date(frontmatter.publishDate).toLocaleDateString()}

In the distant past of 1998, a now basically-defunct but then relatively well-known game publisher called Interplay released an educational title called Learn To Program BASIC. Shortly thereafter, I picked up a copy at the Scholastic book fair and got my first taste of real programming. It was, in short, very 90s. I did learn quite a bit though, and the foundational programming concepts of BASIC that I learned stuck with me and definitely influenced my way of thinking as I grew older.

In the accompanying booklet, there were some practice problems for the player to solve after they'd finished the main game. One of them described the Caesar's Box code, an ancient method of cryptography supposedly invented by the big man J. Caesar himself. First, you write the message you wish to encode in a square grid, so `HELLO INTERNET` would look like:
| | | | |
|-|-|-|-|
|H|E|L|L|
|O| |I|N|
|T|E|R|N|
|E|T| | |

If the length message you wish to encode doesn't work out to be a perfect square (and it rarely does, because math and language just don't work that way) then you can either fill in the remaining spaces with dummy letters, or just leave them blank. Then, you just copy the message reading the columns top-to-bottom, instead of left-to-right like you filled them in. The resulting encoded message comes out looking like this:

`HOTEE ETLIR LNN `

One of the nice things about this is that the same method is used to encrypt and decrypt messages (symmetric cryptography). Thus, one algorithm is all that is needed, and no special keys are required to be exchanged. The challenge was to write a program that could be used to encode or decode messages in this manner.

Well, I'm happy to report, that roughly 20 years after this challenge was first presented to me I've finally cracked the case!

This problem lived in my head rent-free for a looong, long time. Over the years, I taught some other friends the method of encoding messages by hand and would use it to pass notes and engage in other such mischief. I never did figure out how to do it in BASIC, but today I'd like to walk you through a solution I came up with as one of my first exercises in learning Typescript.

We'll write it all as one encapsulating function, with a string - the original message - as the one input parameter, and the encoded message as the return value (also a string)

```ts
const encoder (message: string): string => {
  // TODO
  return new String()
}
```

Next, we'll need to figure out what size box, or grid, we need to make to contain our message. To small, and we won't be able to fit the whole thing. If the length of our message is a perfect square, then we can take the square root of that as our side length. If not, we can still take the square root and just round up to the next integer

```ts
const encoder (message: string): string => {
  const gridSize = Math.ceil(Math.sqrt(message.length))

  return new String()
}
```

---

Check out a compilation of the movies included in the game below!

<iframe width="560" height="315" src="https://www.youtube.com/embed/uBYz9syhNAA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
