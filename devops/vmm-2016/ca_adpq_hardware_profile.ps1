

#dot source to retain variables in scope
$path = Split-Path $MyInvocation.MyCommand.Path
. "$path\ca_adpq_variables.ps1"

function Add-CaAdpqHardwareProfile{

    $JobGroupID = [Guid]::NewGuid().ToString()

    $VMSubnet = Get-SCVMSubnet -Name "AshServer_0"
    $VMNetwork = Get-SCVMNetwork -Name "AshServer"

    New-SCVirtualNetworkAdapter -JobGroup $JobGroupID -MACAddressType Static -Synthetic -EnableVMNetworkOptimization $false -EnableMACAddressSpoofing $false -EnableGuestIPNetworkVirtualizationUpdates $false -IPv4AddressType Dynamic -IPv6AddressType Dynamic -VMSubnet $VMSubnet -VMNetwork $VMNetwork 

    New-SCVirtualScsiAdapter -JobGroup $JobGroupID -AdapterID 7 -ShareVirtualScsiAdapter $false -ScsiControllerType DefaultTypeNoType

    $CPUType = Get-SCCPUType | where {$_.Name -eq "3.60 GHz Xeon (2 MB L2 cache)"}
    $CapabilityProfile = Get-SCCapabilityProfile -Name "Hyper-V"

    $hardwareProfile = New-SCHardwareProfile -Owner '' -CPUType $CPUType -Name $hardwareProfileName -Description "" -CPUCount 2 -MemoryMB 8192 -DynamicMemoryEnabled $false -MemoryWeight 5000 -CPUExpectedUtilizationPercent 20 -DiskIops 0 -CPUMaximumPercent 100 -CPUReserve 0 -NumaIsolationRequired $false -NetworkUtilizationMbps 0 -CPURelativeWeight 100 -HighlyAvailable $true -HAVMPriority 2000 -DRProtectionRequired $false -SecureBootEnabled $false -CPULimitFunctionality $false -CPULimitForMigration $false -CheckpointType Production -CapabilityProfile $CapabilityProfile -Generation 2 -JobGroup $JobGroupID 

}

if(!$existsHardwareProfile){
    
    Write-Host "Creating Hardware Profile: $hardwareProfileName" -ForegroundColor Green

    Add-CaAdpqHardwareProfile | Out-Null

}else{

    Write-Host "Updating Hardware Profile: $hardwareProfileName" -ForegroundColor Yellow

    Remove-SCHardwareProfile $existsHardwareProfile | Out-Null

    Add-CaAdpqHardwareProfile | Out-Null

}