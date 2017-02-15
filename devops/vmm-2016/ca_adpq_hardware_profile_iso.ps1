

#dot source to retain variables in scope
$path = Split-Path $MyInvocation.MyCommand.Path
. "$path\ca_adpq_variables.ps1"

function Add-CaAdpqHardwareProfileIso{

    $JobGroupID = [Guid]::NewGuid().ToString()

    $VMSubnet = Get-SCVMSubnet -Name "AshServer_0"
    $VMNetwork = Get-SCVMNetwork -Name "AshServer"

    New-SCVirtualNetworkAdapter -JobGroup $JobGroupID -MACAddressType Static -Synthetic -EnableVMNetworkOptimization $false -EnableMACAddressSpoofing $false -EnableGuestIPNetworkVirtualizationUpdates $false -IPv4AddressType Dynamic -IPv6AddressType Dynamic -VMSubnet $VMSubnet -VMNetwork $VMNetwork 

    New-SCVirtualScsiAdapter -JobGroup $JobGroupID -AdapterID 7 -ShareVirtualScsiAdapter $false -ScsiControllerType DefaultTypeNoType

    $ISO = Get-SCISO -Name "ubuntu-16.10-server-amd64.iso"

    New-SCVirtualDVDDrive -JobGroup $JobGroupID -Bus 0 -LUN 1 -ISO $ISO

    $CPUType = Get-SCCPUType | where {$_.Name -eq "3.60 GHz Xeon (2 MB L2 cache)"}
    $CapabilityProfile = Get-SCCapabilityProfile -Name "Hyper-V"

    $hardwareProfileIso = New-SCHardwareProfile -Owner '' -CPUType $CPUType -Name $hardwareProfileNameIso -Description "" -CPUCount 2 -MemoryMB 8192 -DynamicMemoryEnabled $false -MemoryWeight 5000 -CPUExpectedUtilizationPercent 20 -DiskIops 0 -CPUMaximumPercent 100 -CPUReserve 0 -NumaIsolationRequired $false -NetworkUtilizationMbps 0 -CPURelativeWeight 100 -HighlyAvailable $true -HAVMPriority 2000 -DRProtectionRequired $false -SecureBootEnabled $false -CPULimitFunctionality $false -CPULimitForMigration $false -CheckpointType Production -CapabilityProfile $CapabilityProfile -Generation 2 -JobGroup $JobGroupID 

}

if(!$existsHardwareProfileIso){
    
    Write-Host "Creating Hardware Profile: $hardwareProfileNameIso" -ForegroundColor Green

    Add-CaAdpqHardwareProfileIso | Out-Null
    
}else{

    Write-Host "Updating Hardware Profile: $hardwareProfileNameIso" -ForegroundColor Yellow

    Remove-SCHardwareProfile $existsHardwareProfileIso | Out-Null

    Add-CaAdpqHardwareProfileIso | Out-Null

}
