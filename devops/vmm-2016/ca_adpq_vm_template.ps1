


#dot source to retain variables in scope
$path = Split-Path $MyInvocation.MyCommand.Path
. "$path\ca_adpq_variables.ps1"

function Add-CaAdpqVmTemplate{

    #job ID for set of tasks
    $JobGroupID = [Guid]::NewGuid().ToString()

    #Ubuntu 16.10 prepped image
    $vhdxName = "CA-ADPQ_Ubuntu_16_10.vhdx"
    $preppedVhdx = Get-SCVirtualHardDisk -Name $vhdxName

    #create virtual drive
    New-SCVirtualDiskDrive -SCSI -Bus 0 -LUN 0 -VirtualHardDisk $preppedVhdx -CreateDiffDisk $false -VolumeType BootAndSystem -JobGroup $JobGroupID

    $template = New-SCVMTemplate -Name $vmTemplateName -RunAsynchronously -Generation 2 -HardwareProfile $existsHardwareProfile -GuestOSProfile $existsOsProfile -JobGroup $JobGroupID -ComputerName "*" -TimeZone 35 -LocalAdministratorCredential $null  -LinuxDomainName "fei.local" -OperatingSystem $existsOperatingSystem 

}

if(!$existsVmTemplate){

    Write-Host "Creating VM Template: $vmTemplateName" -ForegroundColor Green

    Add-CaAdpqVmTemplate | Out-Null

}else{

    Write-Host "Updating VM Template: $vmTemplateName" -ForegroundColor Yellow

    Remove-SCVMTemplate $existsVmTemplate | Out-Null

    Add-CaAdpqVmTemplate | Out-Null

}
