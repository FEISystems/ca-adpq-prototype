
dotnet restore .\ca_proto

dotnet test .\ca_proto\ca_proto_tests

dotnet build .\ca_proto\ca_proto

dotnet publish .\ca_proto\ca_proto\project.json -o .\release

#copy-item .\ca_proto\ca_proto\appSettings.json .\release\appSettings.json