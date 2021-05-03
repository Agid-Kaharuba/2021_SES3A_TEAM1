$Directory = "ENTER_PATH_TO_BUILD"

New-PSDrive -PSProvider registry -Root HKEY_CLASSES_ROOT -Name HKCR
$path = "HKCR:\xrt-training"
New-Item -Path $path -Force -Value "URL:xrt-training"
New-ItemProperty -Path $path -Name "URL Protocol"

$path = "HKCR:\HKEY_CLASSES_ROOT\xrt-training\shell\Open\command"
New-Item -Path $path -Force -Value "$Directory\XRTProject.exe %1"