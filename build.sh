echo -e "----\nBuilding DataFetcher image\n----"
docker build ./src/ -f ./src/Wfdf.DataFetcher/Dockerfile -t datafetcher
echo -e "----\nBuilding docker-compose services\n----"
docker-compose build