# Backend boilerplate to use routing controllers

Routing controllers project boilerplate with typeorm
Decoupled infra for hexagonal arch

## Start using it

Make a copy of our .env.example to .env in your project

## Development

To develop this api just run:

```sh
yarn start
```

This will run the api and **reload** each time a file
is changed.

## Deployment

To use the api, you can use:

```sh
yarn build
yarn serve
```

## Test

To test the api, you can use:

```sh
yarn test
```

## The database

You need docker-compose to up an run a postgres instance.

run `docker compose -f postgres-test.yml up` to have your instance

You need to create a network for use it

Create another copy of this file with diferent configuration for all your environments if you want.

If you need to delete it during development, it's placed on databases/postgres

---

Check out the `dist` directory for deployment in each environment.
