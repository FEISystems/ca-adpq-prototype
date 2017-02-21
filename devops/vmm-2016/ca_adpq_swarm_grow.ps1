


#dot source to retain variables in scope
$path = Split-Path $MyInvocation.MyCommand.Path
. "$path\ca_adpq_variables.ps1"

function Grow-TheSwarm{
    #create and add a VM to the swarm
    if(-Not $caAdpqSwarm10Exists){
        New-SwarmVM -vmName $caAdpqSwarm10Name
    }elseif(-Not $caAdpqSwarm11Exists){
        New-SwarmVM -vmName $caAdpqSwarm11Name
    }elseif(-Not $caAdpqSwarm12Exists){
        New-SwarmVM -vmName $caAdpqSwarm12Name
    }elseif(-Not $caAdpqSwarm13Exists){
        New-SwarmVM -vmName $caAdpqSwarm13Name
    }elseif(-Not $caAdpqSwarm14Exists){
        New-SwarmVM -vmName $caAdpqSwarm14Name
    }
}

function New-SwarmVM{
    Param(
      [string]$vmName
    )

    Write-Host "Adding VM: $vmName" -ForegroundColor Green

    #job id to group all VMM tasks in this job
    $job_group_id = [Guid]::NewGuid().ToString()
    #get the vm template
    $vmTemplate = Get-SCVMTemplate -Name $vmTemplateName
    #grab the hypervisor it will be hosted on
    $vmHost = Get-SCVMHost -ComputerName $vmHostName

    #create a new vm configuration
    $vmConfig = New-SCVMConfiguration -VMTemplate $vmTemplate -Name $vmName

    #set the host hypervisor
    Set-SCVMConfiguration -VMConfiguration $vmConfig -VMHost $vmHost | Out-Null
    Update-SCVMConfiguration -VMConfiguration $vmConfig | Out-Null

    #set the host storage
    Set-SCVMConfiguration -VMConfiguration $vmConfig -VMLocation $vmStorageLocation -PinVMLocation $true -ComputerName $vmName | Out-Null
    Update-SCVMConfiguration -VMConfiguration $vmConfig | Out-Null

    #grab the system disk configuration for a few changes
    $vhdConfigs = Get-SCVirtualHardDiskConfiguration -VMConfiguration $vmConfig
    Set-SCVirtualHardDiskConfiguration -VHDConfiguration $vhdConfigs[0] -PinSourceLocation $false -DestinationLocation $vmStorageLocation -DeploymentOption UseNetwork -FileName ($vmName + "_system") | Out-Null
    Update-SCVMConfiguration -VMConfiguration $vmConfig | Out-Null

    #create that bad boy
    New-SCVirtualMachine -Name $vmName -VMConfiguration $vmConfig -Description "Docker Swarm Host for CA-ADPQ" -BlockDynamicOptimization $true -JobGroup $job_group_id -ReturnImmediately -StartAction NeverAutoTurnOnVM -StopAction SaveVM
}

$swarmVmCount = @(Get-SCVirtualMachine | Where-Object { $_.Name -like "ca-adpq-swarm*" }).Count

#are we at the max VM count for this cluster?
if($swarmVmCount -lt $maxVmNodeCount){
    Grow-TheSwarm
}