---
title: "Jev?"
description: "First thoughts on Jev, the new \"System One Model\" from TypeSafe AI"
pubDate: 2026-09-21
tags: ["jev", "ai", "classifier"]
draft: false
---

Spent the weekend playing around with Jev, a new type of model from TypeSafe AI, and I gotta say, the hype is real.

Jev is not an LLM. It doesn't generate text as an output. It belong to a new class of models that TypeSafe AI has termed "System One" classifier models - the respond-fast counterpart to a "System Two" LLM's more laborious text generation. You hand it something to classify and a set of answers, and the model hands back a classification and a confidence score. That in itself doesn't really sound too revolutionary, but here's the thing:

Jev - and presumably other System One models of the future - are orders of magnitude faster and cheaper to run than LLMs for an equivalent task. TypeSafe's own website touts output tokens as FREE because they are too cheap to meter - you're only billed on input tokens, at $42/billion tokens, that's billion, with a B. That's what turns this into a new AI primitive; LLMs have been capable of classification for some time, and pretty decently too, but the speed and cost of running classifications going straight to rock bottom opens up a whole new world of use cases.

- Put it in front of your chat - is this a request for a tool call? If so, what tool? Jev can answer both of these and route the tool call to fulfil the request before you'd even started getting a response from an LLM.

- Put it at the start of your customer service pipeline and have it run triage on new requests. Category, sentiment analysis, urgency can be assigned in real time to route a correct response.

- Use it as a judge for tool calls and chat responses. Look at the data a semantic search brought back and determine if it's a good fit for inclusion in the context, or at the RAG output compared against the results the retrieval tool call passed back: does it contain hallucinations? Does it answer the question asked? You can do both of these things without appreciably adding to the response time.

You could even use it as a translation layer between the LLM and the tools themselves - no more malformed inputs. The LLM calls a tool in plain language and the translation layer handles the typed inputs using Jev.

In the blog post announcing Jev, Diogo Almeida, TypeSafe's founder, asks this question - 

Models have been superhuman at chat for years, so where is all the automation?

I expect that as System One models gain prevalence, we will finally see the explosion of useful, real-time automation that the AI revolution has been promising us.
