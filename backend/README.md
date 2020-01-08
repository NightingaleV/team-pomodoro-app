# Backend

## Requirements

- Node.js v10.16.2 or later
- `yarn` (`npm install --global yarn`)
- MongoDB database

## Installation

```sh
yarn install
```

Copy `dev.env` to `/config` and add DB connection configuration.

## Run Local Dev Server

```sh
yarn dev
```

Open [localhost:5000](http://localhost:5000/).

## Production Build

```sh
yarn start
```

## Run On Server

Use SSH to login to server and run this:

```sh
cd pomodori/backend
yarn install
yarn build:watch
```

Open [dev.backend.team02.vse.handson.pro](http://dev.backend.team02.vse.handson.pro/).

Now you can edit code in Atom. To stop editing switch back to running SSH, press <kbd>Ctrl</kbd>+<kbd>C</kbd> and log off.

## Format Code

```sh
yarn prettier
```
