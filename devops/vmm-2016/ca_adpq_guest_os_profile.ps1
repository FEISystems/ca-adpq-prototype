

#dot source to retain variables in scope
$path = Split-Path $MyInvocation.MyCommand.Path
. "$path\ca_adpq_variables.ps1"

function Add-CaAdpqOsProfile{
    
    $LocalAdministratorCredential = Get-Credential
    
    $osProfile = New-SCGuestOSProfile -Name $osProfileName -Description "" -ComputerName "CA-ADPQ-SWARM1#" -TimeZone 35 -LocalAdministratorCredential $LocalAdministratorCredential -LinuxDomainName "fei.local" -Owner "" -OperatingSystem $existsOperatingSystem
}

if(!$existsOsProfile){

    Write-Host "Creating Guest OS Profile: $osProfileName" -ForegroundColor Green

    Add-CaAdpqOsProfile | Out-Null

}else{
    
    Write-Host "Updating Guest OS Profile: $osProfileName" -ForegroundColor Yellow

    Remove-SCGuestOSProfile $existsOsProfile | Out-Null
    
    Add-CaAdpqOsProfile | Out-Null

}