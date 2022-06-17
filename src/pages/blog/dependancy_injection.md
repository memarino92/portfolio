---
layout: ../../layouts/blogPost.astro
title: What Is Dependancy Injection?
publishDate: 
img: 
description: |
  A brief introduction to dependancy injection and its application in modern web frameworks.
tags:
  - dependancy injection
  - inversion of control
  - interviewing
  - interview questions
  - technical interview
  - angular
  - typescript
  - C#
  - .NET
  - React
  - Kent C Dodds
---

# What is Dependancy Injection?

During my  most recent round of technical interviews, I received a lot of questions about Dependancy Injection and its application in some common frameworks. It inspired me to do some research to better explain exactly what dependancy injection is, what it does, and how you might use it in your code; and, well, here we are.

Whether you're familiar with the term or not, you've likely used some form of dependancy injection already. Dependancy injection (DI) is a particular implementation of a broader concept in programming called "Inversion of Control". For a great, practical example of how inversion of control can simplify your code, check out [this talk by Kent C Dodds from React Rally 2018](https://www.youtube.com/watch?v=AiJ8tRRH0f8).

## How dependancy injection works
Popular in object-oriented paradigms and people who frequently use class-based design patterns. Using dependancy injection allows the framework author to put the onus on the end developer to initialize one or more dependancies that will be called at runtime, allowing the framework to be more flexable and the end developer to customize the behavior to suit their specific needs.

## Types of dependancy injection

1. Constructor Injection
2. Setter Injection
3. Interface Injection

## Examples
What good is all this theory without some practice? Let's take a look at how DI is put to use in some popular frameworks today.

### Angular

Any time you import something (like a service or a class) and pass that to your component through its constructor? Boom! You guessed it, dependancy injection.
### .NET

Implement interface to return profile from identity server.
Importing contexts inside controller
### React

Render props - mostly fallen out of favor since the introduction of hooks.

## Further Reading
[Dependancy Injection in ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/dependency-injection?view=aspnetcore-6.0)

[Dependancy Injection in Angular](https://angular.io/guide/dependency-injection)

["Inversion of Control Containers and the Dependency Injection pattern" by Martin Fowler aka "Uncle Bob"](https://www.martinfowler.com/articles/injection.html)