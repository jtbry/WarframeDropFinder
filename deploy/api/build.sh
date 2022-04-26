# Terminate on failure
set -e

# Build API
dotnet publish ../src/Wfdf.Api/Wfdf.Api.csproj -c Release -o ./out/api

# Copy API deploy files to build directory
cp ./api/Dockerfile ./out/api/
