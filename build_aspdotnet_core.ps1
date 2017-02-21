
$revision = @{ $true = $env:APPVEYOR_BUILD_NUMBER; $false = 1 }[$env:APPVEYOR_BUILD_NUMBER -ne $NULL];
$revision = "{0:D4}" -f [convert]::ToInt32($revision, 10)

dotnet restore .\ca_proto

dotnet test .\ca_proto\ca_proto_tests

dotnet build --configuration Release .\ca_proto\ca_proto
dotnet build --configuration Release .\ca_proto\ca_service

$release = Join-Path $pwd release
dotnet publish .\ca_proto -c Release -o $release --version-suffix=$revision