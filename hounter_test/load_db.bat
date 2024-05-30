@echo off 
set DB_NAME=%~1

@echo on
echo "Loading database %DB_NAME%"

"C:\Program Files\MySQL\MySQL Server 8.3\bin\mysql.exe" -u root -p1234 test_db < "%cd%\temporary_db\%DB_NAME%.sql"