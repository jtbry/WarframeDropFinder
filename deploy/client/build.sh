# Terminate on failure
set -e

# Build Client
mv ../src/client/.env ./client/tmp.env # Move dev env out of the way
mv ./client/prod.env ../src/client/.env # Move prod env in for build
npm --prefix ../src/client run build # Build client
mv ../src/client/.env ./client/prod.env # Move prod env back to deploy
mv ./client/tmp.env ../src/client/.env # Move dev env back to client
mv ../src/client/build/ ./out/client/ # Move built client to out