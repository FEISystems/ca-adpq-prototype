

# VMM 2016 server
Get-SCVMMServer feiprodvmm002.fei.local | Out-Null

#operating system information in VMM
$operatingSystemName = "Ubuntu Linux 16.04 (64 bit)"
$existsOperatingSystem = Get-SCOperatingSystem | where {$_.Name -eq $operatingSystemName}

#guest OS profile
$osProfileName = "CA-ADPQ Ubuntu Guest OS Profile"
$existsOsProfile = Get-SCGuestOSProfile -Name $osProfileName

#hardware profile for use with prepped vhdx (for automatic and scripted scaling)
$hardwareProfileName = "CA-ADPQ Hardware Profile"
$existsHardwareProfile = Get-SCHardwareProfile | Where-Object {$_.Name -eq $hardwareProfileName}

#vm template for use with prepped vhdx (for automatic and scripted scaling)
$vmTemplateName = "CA-ADPQ VM Template"
$existsVmTemplate = Get-SCVMTemplate -Name $vmTemplateName

#elastic hosting
$minVmNodeCount = 2
$maxVmNodeCount = 5

#Hyper-V host name for placement
$vmHostName = "ashprodhyper041.fei.local"
$vmStorageLocation = "C:\ClusterStorage\Volume11"
$vmStorageName = "LTSSProd07"

#fei.local 17.20.10.* IP POOL - checked for availability
$caAdpqSwarm10Ip = 172.20.10.210
$caAdpqSwarm11Ip = 172.20.10.211
$caAdpqSwarm12Ip = 172.20.10.212
$caAdpqSwarm13Ip = 172.20.10.213
$caAdpqSwarm14Ip = 172.20.10.214

#host names
$caAdpqSwarm10Name = "CA-ADPQ-SWARM10"
$caAdpqSwarm11Name = "CA-ADPQ-SWARM11"
$caAdpqSwarm12Name = "CA-ADPQ-SWARM12"
$caAdpqSwarm13Name = "CA-ADPQ-SWARM13"
$caAdpqSwarm14Name = "CA-ADPQ-SWARM14"

#hosts exist
$caAdpqSwarm10Exists = (@(Get-SCVirtualMachine -Name $caAdpqSwarm10Name).Count -ne 0)
$caAdpqSwarm11Exists = (@(Get-SCVirtualMachine -Name $caAdpqSwarm11Name).Count -ne 0)
$caAdpqSwarm12Exists = (@(Get-SCVirtualMachine -Name $caAdpqSwarm12Name).Count -ne 0)
$caAdpqSwarm13Exists = (@(Get-SCVirtualMachine -Name $caAdpqSwarm13Name).Count -ne 0)
$caAdpqSwarm14Exists = (@(Get-SCVirtualMachine -Name $caAdpqSwarm14Name).Count -ne 0)