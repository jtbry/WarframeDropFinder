# Environments
## api
Add a `cloudenv.yaml` to the `./api` and define environment variables for the API's GAE instance
- ConnectionStrings__MongoDb
- ReactAppDomain

## client
Add any necessary environment variables to the `./client/prod.env` file, these env variables will be used to build the react app

# Deploy
Make sure you are logged in with the Netlify CLI and GCloud CLI

Make sure the correct project is selected for the GCloud API. If you do not already have the `.netlify` folder in the `deploy` directory you will be asked to select a project for deploying netlify

