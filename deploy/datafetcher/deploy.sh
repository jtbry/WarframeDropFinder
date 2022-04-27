# Deploy app to heroku - heroku-scheduler must be set up on the project
cd ./out/datafetcher
heroku container:push -a wfdf-datafetcher web
heroku container:release -a wfdf-datafetcher web