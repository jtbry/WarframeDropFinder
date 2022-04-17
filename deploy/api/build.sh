# Terminate on failure
set -e

# Build API
dotnet publish ../src/Wfdf.Api/Wfdf.Api.csproj -c Release -o ./out/api

# Copy API deploy files to build directory
cp ./api/app.yaml ./out/api/
cp ./api/cloudenv.yaml ./out/api/
cp ./api/Dockerfile ./out/api/
