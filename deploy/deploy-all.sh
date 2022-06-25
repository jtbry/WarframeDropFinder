# Build apps
echo -e "Building\n----"
./api/build.sh
./client/build.sh
./datafetcher/build.sh

# Deploy apps
echo -e "----\nDeploying\n----"
./api/deploy.sh
./client/deploy.sh
./datafetcher/deploy.sh

# Remove built files
if [ "$1" != "--keep-build" ]; then
    echo -e "----\nRemoving built files\n----"
    rm -rf ./out/*
fi

echo -e "----\nDone."