
dotnet restore .\ca_proto

dotnet test .\ca_proto\ca_proto_tests

dotnet build --configuration Release .\ca_proto\ca_proto
dotnet build --configuration Release .\ca_proto\ca_service

dotnet publish .\ca_proto\ca_proto -c Release -o .\release\ca_proto
dotnet publish .\ca_proto\ca_service -c Release -o .\release\ca_service