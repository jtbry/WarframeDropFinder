FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY . .
ENV ASPNETCORE_URLS=http://+:8080
ENTRYPOINT ["dotnet", "Wfdf.Api.dll"]