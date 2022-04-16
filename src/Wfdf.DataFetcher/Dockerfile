FROM mcr.microsoft.com/dotnet/runtime:6.0 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["Wfdf.DataFetcher/Wfdf.DataFetcher.csproj", "Wfdf.DataFetcher/"]
RUN dotnet restore "Wfdf.DataFetcher\Wfdf.DataFetcher.csproj"
COPY . .
WORKDIR "/src/Wfdf.DataFetcher"
RUN dotnet build "Wfdf.DataFetcher.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Wfdf.DataFetcher.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Wfdf.DataFetcher.dll"]
