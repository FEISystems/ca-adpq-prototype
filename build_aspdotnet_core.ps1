
dotnet restore .\ca_proto

dotnet test .\ca_proto\ca_proto_tests

dotnet build .\ca_proto\ca_proto

$release = Join-Path $pwd release
dotnet publish .\ca_proto\ca_proto -c Release -o $release