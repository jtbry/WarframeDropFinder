# Deploy app to heroku
cd ./out/api
heroku container:push -a wfdf web
heroku container:release -a wfdf web