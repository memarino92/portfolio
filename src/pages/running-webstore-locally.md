---
layout: ../layouts/running-webstore-locally.astro
title: Running Webstore Locally
client: Self
publishDate: 2022-03-22 00:00:00
img: https://res.cloudinary.com/mmarino/image/upload/e_art:sonnet,f_auto,q_auto/v1647571680/webstore_screenshot_lx9vbf.png
description: |
  Getting WebStore up and running as quickly as possible
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

# Running WebStore

[View the source on GitHub](https://github.com/memarino92/WebStore)

## Database

For simplicity I've created a database in Azure for you to connect to when running locally, and temporarily eased the firewall restrictions. Bear in mind it is running on the free tier, so responses may not be the snappiest.

## Getting Started

### Prerequisites

Make sure you have installed:

- Node
- Visual Studio
- Visual Studio Code (Recommended for Angular development)
- Git

If you wish to make changes to the API endpoints you will need the NSwag CLI installed [(Download NSwag.zip here)](https://github.com/RicoSuter/NSwag/releases). Once installed you can re-generate the service proxy by running the command `nswag run /runtime:net60 ` in the root directory of the Angular project.

Automatic code formatting for the Angular app is handled with [Prettier](https://prettier.io/). In my opinion, using Prettier would be the single biggest quality of life improvement for the development of Tempest. Never worry about properly indenting deeply nested HTML again. Seriously.

Updating models and making changes to the database schema is handled through EF migrations, which is outside the scope of this guide. More information can be found [here](https://docs.microsoft.com/en-us/ef/core/managing-schemas/migrations/?tabs=dotnet-core-cli).

### Clone the source code

From your terminal run:

```
git clone https://github.com/memarino92/WebStore.git
cd Webstore
```

### Set environment variables

Create a `.env` file in the root of each project:

- `WebStore\IdentityServer\.env`
- `WebStore\WebStoreAPI\.env`
- `WebStore\WebStoreFrontend\.env`

Copy and paste the environment variables emailed to you into their respective `.env` files.

For a detailed discussion on why one might choose a `.env` solution over `applicationSettings.json` or other methods of configuration, see [this blog post](https://dusted.codes/dotenv-in-dotnet) for .NET specifically or the [Config](https://12factor.net/config) page of the [12 Factor App](https://12factor.net/) guidelines for a broader overview.

### Set multiple startup projects in Visual Studio

Open the `WebStore.sln` file in Visual Studio. In the Solution Explorer, right click the solution and select "Set Startup Projects". In the dialog, select the "Multiple Startup Projects" option and make the following adjustments:

- IdentityServer - Start
- WebStoreAPI - Start
- WebStoreFrontend - None

The backend should now be setup and ready to run with debugging by hitting F5

OPTIONAL: Configure SwaggerUI to launch automatically on startup by changing the `"launchBrowser"` property to `"true"` inside `WebStore\WebStoreAPI\Properties\launchSettings.json`.

### Frontend Setup

Open the `Webstore\WebStoreFrontend` directory in Visual Studio Code. Open the terminal and run:

```
npm install
```

This might take a couple of minutes. If npm gives you an error, retry the command with the `--legacy-peer-deps` flag:

```
npm install --legacy-peer-deps
```

and the installation should complete without error (the error is being caused by outdated dependencies in the MDBootstrap library). Once it is finished, start the project with:

```
npm start
```

Once the server has started, you should be able to see the project running at [https://localhost:4200/](https://localhost:4200).

### Users

Login credentials for existing users:

| Username          | Password   |
| ----------------- | ---------- |
| webstoreuser      | Pass@word1 |
| webstoreadminuser | Pass@word1 |


**Note:** When updating user passwords through the admin panel, new passwords must meet password complexity requirements (minimum 8 characters, include uppercase, lower case, numbers and special characters). If the password does not meet the requirements the update will silently fail with no indication in the UI.