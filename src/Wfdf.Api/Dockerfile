FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 5207

ENV ASPNETCORE_URLS=http://+:5207

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["src/Wfdf.Api/Wfdf.Api.csproj", "src/Wfdf.Api/"]
RUN dotnet restore "src\Wfdf.Api\Wfdf.Api.csproj"
COPY . .
WORKDIR "/src/src/Wfdf.Api"
RUN dotnet build "Wfdf.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Wfdf.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Wfdf.Api.dll"]
