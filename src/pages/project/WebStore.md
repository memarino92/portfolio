---
layout: ../../layouts/project.astro
title: WebStore
client: Self
publishDate: 2022-03-17 00:00:00
img: https://res.cloudinary.com/mmarino/image/upload/e_art:sonnet,f_auto,q_auto/v1647571680/webstore_screenshot_lx9vbf.png
description: |
  a full-stack ecommerce application powering the business of a fictional bookstore
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

# WebStore

WebStore is a full-stack ecommerce application powering the business of a fictional bookstore. Its main purposes are to demonstrate my ability as a software engineer and to familiarize myself with the technologies that my employer uses.

[View the source on GitHub](https://github.com/memarino92/WebStore)

## Main Technologies

Angular 12

.NET 6

ASP.NET

Entity Framework Core

Duende Identity Server v6

SQL Server

Git

## Technical Overview

WebStore is composed of three main independant services - an [Angular](https://angular.io/) front-end client (written in Typescript, HTML and CSS), an [ASP.NET](https://dotnet.microsoft.com/en-us/apps/aspnet) REST API (written in C#), and an IdentityServer to issue tokens for user authentication and role-based access control to the API. All services have their configurations set through environment variables to allow the source to remain open without leaking sensitive variables or credentials.

Authentication is based on the OpenID Connect/OAuth2 specs using [Duende IdentityServer](https://duendesoftware.com/products/identityserver) to to issue JSON Web Tokens (JWT). Both the client and the API recognize IdentityServer as the "Token Authority" - the client receives tokens when a user logs in, and sends them along with requests to the API. The API then checks with the IdentityServer to make sure the token is valid before executing any restricted requests. Currently there 3 types of routes in the API: open routes (no restrictions on who can call), routes that must validate that the user is authenticated, and routes that only an authenticated user with the role of admin can call. A list of assigned user roles is included in the access token that is issued so that both the front end and the API can grant role-based access without extra calls to the API or database.

The API is built on the latest versions of .NET, ASP.NET and Entity Framework Core. The API and IdentityServer both share access to the same underlying database (SQL Server). IdentityServer uses the database to persist and read configuration and operational data. Catalog, cart, order and user data are persisted to and read from the database through the API. Email sending with a custom domain ([no-reply@michaelmarino.dev](mailto:no-reply@michaelmarino.dev)) is enabled through [SendGrid](https://sendgrid.com/) integration.

The API uses [Swagger](https://github.com/domaindrivendev/Swashbuckle.AspNetCore) to publish a JSON schema of available types, along with controller endpoints and their parameters, which [NSwag](https://github.com/RicoSuter/NSwag) then uses to generate a Typescript client for the Angular application.

The frontend is built on Angular 12. It uses [Tailwind CSS](https://tailwindcss.com/) for layout and [Material Design for Bootstrap](https://mdbootstrap.com/) as a component library. [Cloudinary](https://cloudinary.com/) is used for image uploading, hosting and on-the-fly transformations.

During development a local SQL Server instance running in a [Docker](https://www.docker.com/) container is used.

The deployed application is available to preview at [https://webstore.michaelmarino.dev](https://webstore.michaelmarino.dev). It uses [Netlify](https://www.netlify.com/) to host the front end, [Railway](https://railway.app/) to host containerized versions of both the API and IdentityServer instances, and [Azure](https://azure.microsoft.com/) to host the SQL Server instance. Domain services are configured using [Google Domains](https://domains.google/) as the registrar and [Cloudflare](https://www.cloudflare.com/) for DNS. All SSL certificates are generated and renewed automatically using [Let's Encrypt](https://letsencrypt.org/). Deployments are entirely automated and configured to listen for changes to the `main` branch on [GitHub](https://github.com).

## Functionality

The home page displays the option to browse books by categories and a selection of featured books. The navbar will display user info if the user is authenticated or a link to login if they are not. The search input in the navbar will search books by title and author.

Once a user is logged in, they can add books to their cart and place an order, which records the order in the database and sends an email to their registered email address. Admin users can create new books, delete books, create new users with the option to make them admins as well, and reset user passwords. Admin users can upload images when creating new books which are then requested back in a specific size as needed at runtime.
