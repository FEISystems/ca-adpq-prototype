
dotnet restore .\ca_proto

dotnet test .\ca_proto\ca_proto_tests

dotnet build .\ca_proto\ca_proto --configuration Release

dotnet publish .\ca_proto\ca_proto\project.json -o .\release -c Release