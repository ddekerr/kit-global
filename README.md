# Kit Global API

This project was created using:

- Nest.js
- Mongo DB (Mongoose)
- Swagger (for documentation)
- Passport.js (access/refresh strategy)

## Installation

```bash
$ npm install
```

Create .env with this content:

```bash
MONGO_CONECTION=mongodb+srv://admin:admin@cluster0.tr5edqa.mongodb.net/?retryWrites=true&w=majority
JWT_ACCESS_SECRET=JWT_ACCESS_SECRET
JWT_REFRESH_SECRET=JWT_REFRESH_SECRET
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Read docs [here](http://localhost:3000/api/docs)

### Test all routes in [Postman](https://api.postman.com/collections/3985491-cab7c515-4fc1-4cda-ac27-cc2ddc9a5c53?access_key=PMAT-01HC8H3RF40FPMXAAT2B9MMGQ5)
