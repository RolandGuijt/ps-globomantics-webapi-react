Remove-Item -Path ..\ReactHost\wwwroot\static -Force -Recurse
npm run build
xcopy build\ ..\ReactHost\wwwroot\ /s /y /q