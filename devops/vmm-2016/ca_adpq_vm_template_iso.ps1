


#dot source to retain variables in scope
$path = Split-Path $MyInvocation.MyCommand.Path
. "$path\ca_adpq_variables.ps1"

function Add-CaAdpqVmTemplateIso{

    #job ID for set of tasks
    $JobGroupID = [Guid]::NewGuid().ToString()

    #Ubuntu 16.10 prepped image
    $vhdxName = "CA-ADPQ_Ubuntu_16_10.vhdx"
    $preppedVhdx = Get-SCVirtualHardDisk -Name $vhdxName

    #create virtual drive
    New-SCVirtualDiskDrive -SCSI -Bus 0 -LUN 0 -VirtualHardDisk $preppedVhdx -CreateDiffDisk $false -VolumeType BootAndSystem -JobGroup $JobGroupID

    $template = New-SCVMTemplate -Name $vmTemplateNameIso -RunAsynchronously -Generation 2 -HardwareProfile $existsHardwareProfileIso -GuestOSProfile $existsOsProfile -JobGroup $JobGroupID -ComputerName "*" -TimeZone 35 -LocalAdministratorCredential $null  -LinuxDomainName "fei.local" -OperatingSystem $existsOperatingSystem 

}

if(!$existsVmTemplateIso){

    Write-Host "Creating VM Template: $vmTemplateNameIso" -ForegroundColor Green

    Add-CaAdpqVmTemplateIso | Out-Null

}else{

    Write-Host "Updating VM Template: $vmTemplateNameIso" -ForegroundColor Yellow

    Remove-SCVMTemplate $existsVmTemplateIso | Out-Null

    Add-CaAdpqVmTemplateIso | Out-Null

}
