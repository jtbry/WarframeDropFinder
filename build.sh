echo -e "----\nBuilding DataFetcher image\n----"
docker build . -f ./src/Wfdf.DataFetcher/Dockerfile
echo -e "----\nBuilding docker-compose services\n----"
docker-compose build