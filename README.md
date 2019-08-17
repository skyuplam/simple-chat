## Main tasks

- [X] Implement a chat service, that supports at least 2 different devices at
  the same time
- [X] You should be able to edit your own messages. Other particpants should see
  that the message was edited
- [X] You should be able to delete your own messages. Other particpants should
  see that the message was deleted
- [X] List of active participants to show who is in the session right now
- [X] Style the chat to look like the provided design

## Bonus tasks

- [ ] Image support
- [X] Fetch URLs and display a page preview on link hover
- [X] Emojis
- [ ] Giphy support
- [ ] Alternative layouts / themes
- [ ] End to end encryption

## Getting Start

Please see `scripts` field in [package.json](package.json) file for other
commands.

NOTE: only the users in the [db.ts](src/db.ts) file can access the meeting room.

```sh
# Install dependencies
$ yarn install

# Start dev server
$ yarn start

# Open a Browser and visit the site via http://localhost:1234
# Input the name in the [mock db](src/db.ts), e.g. Terrence Lam
# to login and join the meeting!
```

## Src Organization

```sh
src
├── client.ts   # Client Entry point
├── components  # React components
├── config.ts   # Project config file
├── containers  # React-redux state and action containers
├── db.ts       # Fake DB
├── effects     # Server Effects
├── hooks       # Custom react hooks
├── html        # HTML file containers
├── listeners   # Server listeners, e.g. HTTP and WebSocket
├── middlewares # Server middlewares
├── server.ts   # Server entry point
├── services    # API services for client fetching
├── store       # Redux store and related
└── utils       # Utilities folder for common utilities
```
