# bzzr: application structure and organization

bzzr is a realtime web buzzer for trivia nights. A host creates a room, players join with a six-character code or invitation link, and everyone sees the same server-assigned buzz order. The host manages rounds and can also play. Spectators can watch live results without occupying player seats. Questions, answers, scoring, accounts, and video calls are outside the current product scope.

The application uses RedwoodSDK 1, React 19, Tailwind CSS 4, and Cloudflare Workers with SQLite-backed Durable Objects. Its central architectural choice is one authoritative Durable Object per room. The browser displays the game; the room decides what happened.

## Repository organization

| Location                      | Responsibility                                                                                             |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `src/worker.tsx`              | Worker entry point, middleware, explicit routes, document rendering, and Durable Object exports.           |
| `src/client.tsx`              | RedwoodSDK browser initialization.                                                                         |
| `src/domain/room.ts`          | Pure room state transitions, membership, host authority, rounds, buzz order, moderation, and expiry rules. |
| `src/domain/protocol.ts`      | Shared protocol types, command parsing, validation, errors, and resource limits.                           |
| `src/server/api.ts`           | Public HTTP boundary, origin checks, rate limiting, capability cookies, and routing to room objects.       |
| `src/server/BuzzerRoom.ts`    | Cloudflare adapter for room persistence, command processing, WebSockets, presence, and expiry alarms.      |
| `src/server/http.ts`          | Bounded request parsing, error responses, cookie handling, and capability token generation and hashing.    |
| `src/app/Document.tsx`        | HTML document, metadata, stylesheet and client entry loading, and initial theme setup.                     |
| `src/app/pages`               | Page composition and page-level Storybook examples.                                                        |
| `src/app/hooks`               | Browser session state, pending commands, appearance, and handedness preferences.                           |
| `src/app/lib`                 | HTTP client, WebSocket connection lifecycle, and theme utilities.                                          |
| `src/app/components`          | Game presentation, interactive controls, and component stories.                                            |
| `src/app/components/catalyst` | Locally copied Catalyst UI primitives.                                                                     |
| `src/legacy`                  | An inert session Durable Object retained for migration compatibility.                                      |
| `tests`                       | Unit, component, runtime integration, and browser tests.                                                   |
| `docs/decisions`              | Architecture decision records documenting choices and consequences.                                        |

The domain, server, hooks, and presentation directories express bzzr's own architectural boundaries. They are not an automatically generated application model or a filesystem route registry.

## RedwoodSDK's role

The app uses RedwoodSDK as the integration layer between React rendering and the Cloudflare Worker. Route registration is explicit in `src/worker.tsx`; placing a component in `src/app/pages` does not create a URL.

`defineApp` from `rwsdk/worker` assembles the request pipeline. The pipeline applies common response headers, dispatches `/api/` requests to bzzr's API handler, exposes a JSON health endpoint, and renders document routes. This keeps both page requests and the room API visible in one entry point.

`route` and `render` from `rwsdk/router` connect URL patterns to handlers and React output. `render(Document, ...)` wraps the page routes in the shared HTML document. The registered pages include the home page, `/room/:code`, `/room/:code/spectate`, and a fallback. Route handlers receive parameters and response state, allowing bzzr to normalize room codes and set a 404 status for malformed codes. Actual room existence and session authorization are checked through the room API.

Server-rendered page composition is combined with React client components for forms, room state, and interaction. The `"use client"` directive marks the React client boundary. `src/client.tsx` calls RedwoodSDK's `initClient()` to initialize the browser runtime and hydrate the interface. This lets the application compose its initial document on the server while keeping socket ownership and browser preferences in client code.

RedwoodSDK also supplies typed integration points. The document uses `DocumentProps`, and the common-header function uses `RouteMiddleware`. The framework-provided `rw.nonce` connects the document's scripts with the app's production Content Security Policy. bzzr defines the policy; RedwoodSDK supplies the request-scoped nonce used by it.

The Vite configuration combines RedwoodSDK's `redwood()` plugin with Cloudflare's Vite plugin and Tailwind's Vite plugin. Together these support the React server/client build, the Worker environment, and stylesheet compilation. Local development uses Cloudflare's workerd runtime for platform APIs.

The game protocol remains application code. Room creation and membership use ordinary HTTP requests; live commands and snapshots use WebSockets. The implementation does not use RedwoodSDK server functions or synchronized-state helpers for game authority. Cloudflare's Durable Object APIs supply storage, hibernation, and alarms. The current app also has no GraphQL service layer, Prisma model, or D1 database.

## The domain and platform boundary

The domain is plain TypeScript, independent of React and Cloudflare. It defines valid room transitions and public snapshots. Time and identity values are supplied by the server adapter, allowing rules to be exercised without running a browser or Worker.

The Durable Object translates platform events into domain operations. It restores a versioned room record, authenticates members, applies commands, saves accepted mutations, and broadcasts public state. Storage completes before successful game changes are acknowledged or broadcast.

A room code maps directly to `ROOMS.getByName(code)`. There is no global room directory or shared coordination service. Different rooms have separate authorities and storage; participants in the same room converge on the same authority.

Each room stores a bounded record through the Durable Object storage API, backed by SQLite. This is not a growing event log or a relational schema managed by an ORM. Only the current round is retained. Rooms support 60 players and a separate allowance of 120 spectator identities, and expire after two hours without game activity or 24 hours total.

Buzz order is server arrival order. Clients cannot assign positions, choose roles, or settle ties using their clocks. Duplicate buzzes and stale-round commands are rejected. This gives a room one consistent ordering, but does not eliminate differences in network latency between players.

## The browser and presentation boundary

`RoomClient` connects the browser lifecycle to the interface. `useRoom` manages session recovery, snapshots, pending commands, and user-facing state. The separate `room-connection.ts` module owns the socket lifecycle, reconnect backoff, connection health, and cleanup. Buzzes are not automatically replayed after reconnection.

Presentation flows through `RoomView` to the play or spectator interface. Components receive state and callbacks rather than owning the room's persistence or ordering rules. The UI can show a pending command, but does not optimistically grant a buzz position.

Appearance and handedness are device preferences. They affect layout and display without changing room state. Spectator presentation is selected by the tab's route, so a host or player can open a projection view while continuing to play in another tab using the same browser identity.

Styles use Tailwind utilities and theme tokens. Selected Catalyst components are copied into the repository and adapted locally, with their third-party notice preserved. The sibling toolkit directory is not a build dependency.

Storybook renders the same presentation components with deterministic fixtures and simulated commands. Its playable rounds demonstrate interface transitions without opening production rooms or requiring the game backend.

## Authentication and lifecycle boundaries

Room access uses capability cookies rather than user accounts. The public room code locates a room; it does not grant host authority. The HTTP layer generates private capabilities and stores them in cookies, while room records hold token hashes. Neither tokens nor hashes appear in public room snapshots.

The HTTP boundary enforces origin checks, bounded inputs, and rate limits. The room authority checks membership and command permissions. Spectators can receive state but cannot execute game commands or extend room expiry.

Disconnecting preserves membership for reconnection. Explicit departure removes membership and the player's current buzz, frees the seat and name, and transfers hosting in join order when necessary. The final player's departure closes the room. Host moderation can remove a player or ban their browser capability for the room's remaining lifetime; this is not an account-wide identity ban.

WebSockets use Cloudflare's hibernation APIs and serialized attachments. An idle room can leave memory while its connections remain established, then restore state when needed. Transport ping/pong replies use platform auto-responses. Expiry uses storage alarms rather than a continuously running server timer. Ending or expiring a room closes its sockets and deletes its stored data.

## Tests follow the boundaries

Pure rules, HTTP helpers, components, hooks, and browser transport have unit-level coverage. Runtime integration tests run the actual server adapters in workerd, including persistence, concurrent joins, socket broadcasts, eviction, restored attachments, and alarm cleanup. A test-only Worker entry exposes the production adapters to the test runtime without adding test endpoints to the deployed app.

Storybook interaction tests exercise visible states and accessibility in Chromium. Playwright journeys use the built application with independent host and guest browser contexts to test cookies, hydration, ordering, round controls, recovery, and room lifecycle. Simulated Storybook play is kept distinct from networking verification.

`pnpm check` combines type checking, linting, formatting, unit tests, and runtime integration tests. `pnpm verify` adds coverage checks, browser journeys, a static Storybook build, and Storybook tests. Architectural decisions and operational limits are recorded alongside the code.

## Deployment strategy

The repository's deployment strategy assigns production publishing to Cloudflare's Git integration. GitHub Actions validates pull requests and changes to `main` in separate quality and browser jobs, retaining coverage, browser reports, and the static Storybook artifact. The workflow contains no production deployment step or Cloudflare deployment token. Branch protection and deployment gating are account settings, not guarantees enforced by this repository alone.

The application Worker is named `bzzr`, with `bzzr.app` documented as its production domain. Builds use Node 24 or later, pinned pnpm 11.19.0, and the frozen lockfile. Vite builds the application and assets, and Wrangler deploys using Vite's generated deployment configuration. The repository's combined `pnpm release` command runs the build followed by Wrangler deployment.

`wrangler.jsonc` declares the room Durable Object binding, request rate limit bindings, static asset binding, compatibility settings, and observability. The app requires no separately provisioned D1 database, KV namespace, R2 bucket, or application secret. Local development and validation are separate from production publishing.

Storybook has its own static-assets Worker, `bzzr-storybook`, configured with the custom domain `storybook.bzzr.app`. It serves `storybook-static/` without a Worker script, room bindings, or Durable Object migrations. Its independent configuration separates the component workshop from the game and its storage. Cloudflare Git integration is also the documented publishing path for this artifact.

Durable Object migration history is preserved: `v1` introduced the starter's `SessionDurableObject`, and `v2` introduced `BuzzerRoom`. The legacy class remains exported but does not issue new sessions. Keeping that export preserves compatibility without silently deleting the old namespace or its data.

Rollback depends on storage compatibility. Restoring an older Worker does not undo a Durable Object migration, and older code must understand the current stored schema. Incompatible changes may require a forward fix. Separate preview environments require separate Worker names, bindings, and domains to keep preview traffic away from production room storage.
