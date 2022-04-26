# Terminate on failure
set -e

# Build API
dotnet publish ../src/Wfdf.DataFetcher/Wfdf.DataFetcher.csproj -c Release -o ./out/datafetcher

# Copy API deploy files to build directory
cp ./datafetcher/Dockerfile ./out/datafetcher/
