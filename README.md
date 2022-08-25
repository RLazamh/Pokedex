<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# How execution the project

1. Clone repository
2. Execute

```
yarn install
```

3. Have the nest installed

```
npm i -g @nestjs/cli
```

4. Up Database

```
docker-compose up -d
```

6. Clone file **.env.template.** and rename the copy to **.env**

7. Execute the app

```
yarn run start:dev
```

8. FIll DB with Seed with request POST

```
http://localhost:3000/api/v2/seed

```

## Logs

```
heroku logs --tail
```

## Stack used

- MongoDB
- Nest

## Product Build

1. Create the file `.env.prod`
2. Llenar las variables de produccion
3. Crear una nueva imagen

```
sudo docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```

And quit --build and puth docker -d
