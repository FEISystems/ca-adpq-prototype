FROM microsoft/aspnetcore:latest

# Set ASP.NET Core environment variables
ENV ASPNETCORE_URLS="http://*:5000"
ENV ASPNETCORE_ENVIRONMENT="Development"

# Copy files to app directory
ARG releaseDir=./release
COPY $releaseDir /ca_proto

# Set working directory
WORKDIR /ca_proto

# Open port
EXPOSE 5000/tcp

# Run
ENTRYPOINT ["dotnet", "ca_proto.dll"]