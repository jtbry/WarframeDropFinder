# Deploy app to gcloud app engine
cd ./out/datafetcher
heroku container:push -a wfdf worker
heroku container:release -a wfdf worker