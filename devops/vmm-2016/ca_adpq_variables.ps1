

# VMM 2016 server
Get-SCVMMServer feiprodvmm002.fei.local | Out-Null

#operating system information in VMM
$operatingSystemName = "Ubuntu Linux 16.04 (64 bit)"
$existsOperatingSystem = Get-SCOperatingSystem | where {$_.Name -eq $operatingSystemName}

#gues OS profile
$osProfileName = "CA-ADPQ Ubuntu Guest OS Profile"
$existsOsProfile = Get-SCGuestOSProfile -Name $osProfileName

#hardware profile for use with prepped vhdx (for automatic and scripted scaling)
$hardwareProfileName = "CA-ADPQ Hardware Profile"
$existsHardwareProfile = Get-SCHardwareProfile | Where-Object {$_.Name -eq $hardwareProfileName}

#vm template for use with prepped vhdx (for automatic and scripted scaling)
$vmTemplateName = "CA-ADPQ VM Template"
$existsVmTemplate = Get-SCVMTemplate -Name $vmTemplateName

#hardware profile for use with installation ISO (for custom configuration)
$hardwareProfileNameIso = "CA-ADPQ Hardware Profile - w ISO"
$existsHardwareProfileIso = Get-SCHardwareProfile | Where-Object {$_.Name -eq $hardwareProfileNameIso}

#vm template for use with installation ISO (for custom configuration)
$vmTemplateNameIso = "CA-ADPQ VM Template - w ISO"
$existsVmTemplateIso = Get-SCVMTemplate -Name $vmTemplateNameIso