Remove-Item -Path ..\Api\wwwroot\assets -Force -Recurse
npm run build
xcopy dist\ ..\Api\wwwroot\ /s /y /q