
dotnet restore .\ca_proto

dotnet test .\ca_proto\ca_proto_tests

dotnet build --configuration Release .\ca_proto\ca_proto
dotnet build --configuration Release .\ca_proto\ca_service

$release = Join-Path $pwd release
dotnet publish .\ca_proto\ca_proto -c Release -o $release
dotnet publish .\ca_proto\ca_service -c Release -o $release