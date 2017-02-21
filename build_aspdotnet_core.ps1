
dotnet restore .\ca_proto

dotnet test .\ca_proto\ca_proto_tests

dotnet build --configuration Release --runtime ubuntu.16.10-x64 .\ca_proto\ca_proto

$release = Join-Path $pwd release
dotnet publish .\ca_proto\ca_proto -c Release -o $release