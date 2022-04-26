# Deploy app to gcloud app engine
cd ./out/api
heroku container:push -a wfdf web
heroku container:release -a wfdf web