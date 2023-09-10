# Friend App

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation and Initial Setup 

```bash
$ yarn install

$ cp dev.env .env

$ docker-compose up -d
$ yarn migrate
$ yarn seed
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev
```

## Testing The Routes

### GET Routes

- `http://localhost:3000/users?take=5&skip=0` (note: no additional filters were supported here, but in production we would make this composable so any combination of filters could be applied)
- `http://localhost:3000/users/1`
- With an `id` from the first API response, apply that as a query string param to this endpoint: `http://localhost:3000/friends?userId=1` (alternatively this could have been written as `/users/1/friends`)
- Optionally, grab the `id` of a friend from the previous response and call `http://localhost:3000/friends/distance?userId=1&friendId=2` (note: the max recursive depth is 5 and the system does not distinguish between the max depth being exceeded and there being no connected friends)

### POST /users

```bash
curl --request POST \
  --url http://localhost:3000/users \
  --header 'Content-Type: application/json' \
  --data '{
	"email": "jason@walsh-web.com",
	"firstName": "Jason",
	"lastName": "Walsh"
}'
```

### PATCH /users/:id

```bash
curl --request PATCH \
  --url http://localhost:3000/users/5001 \
  --header 'Content-Type: application/json' \
  --data '{
	"firstName": "Jay"
}'
```

### DELETE /users/:id

```bash
curl --request DELETE \
  --url http://localhost:3000/users/5001 \
  --header 'Content-Type: application/json'
```