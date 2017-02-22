
dotnet restore .\ca_proto

dotnet test .\ca_proto\ca_proto_tests

dotnet build .\ca_proto --configuration Release

dotnet publish $(build.sourcesdirectory)\src .\ca_proto\ca_proto\project.json --output $(build.stagingDirectory) --configuration Release