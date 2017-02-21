
dotnet restore .\ca_proto\ca_service
dotnet restore .\ca_proto\ca_proto_tests
dotnet restore .\ca_proto\ca_proto

dotnet build .\ca_proto\ca_service --configuration Release --no-dependencies
dotnet build .\ca_proto\ca_proto_tests --configuration Release --no-dependencies
dotnet build .\ca_proto\ca_proto --configuration Release --no-dependencies

dotnet test .\ca_proto\ca_proto_tests

$release = Join-Path $pwd release
dotnet publish .\ca_proto\ca_proto -c Release -o $release