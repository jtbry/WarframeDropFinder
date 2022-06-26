# Environments

## api

Make sure the following variables are set on your production platform

- ConnectionStrings\_\_MongoDb (Connection string for MongoDB instance)
- ConnectionStrings\_\_Redis (Connection string for Redis instance)
- ReactAppDomain (App to deployed react app, for CORs and redirects)

## client

Add any necessary environment variables to the `./client/prod.env` file, these env variables will be used to build the react app

- REACT_APP_API_URL (The URL to your back-end)

# Deploy

Make sure you are logged in with the Netlify CLI and Heroku / Heroku Container
Make sure you set your heroku project name in `deploy.sh` files for `./api` and `./datafetcher`

If you do not already have the `.netlify` folder in the `deploy` directory you will be asked to select a project for deploying netlify
