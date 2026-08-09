@REM ----------------------------------------------------------------------------
@REM Licensed to the Apache Software Foundation (ASF) under one
@REM or more contributor license agreements.  See the NOTICE file
@REM distributed with this work for additional information
@REM regarding copyright ownership.  The ASF licenses this file
@REM to you under the Apache License, Version 2.0 (the
@REM "License"); you may not use this file except in compliance
@REM with the License.  You may obtain a copy of the License at
@REM
@REM    https://www.apache.org/licenses/LICENSE-2.0
@REM
@REM Unless required by applicable law or agreed to in writing,
@REM software distributed under the License is distributed on an
@REM "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
@REM KIND, either express or implied.  See the License for the
@REM specific language governing permissions and limitations
@REM under the License.
@REM ----------------------------------------------------------------------------

@REM Begin all REM://...
@echo off
@REM Set the current directory to the location of this script
set WRAPPER_LAUNCHER=org.apache.maven.wrapper.MavenWrapperMain

@setlocal
set MAVEN_PROJECTBASEDIR=%~dp0

@REM Find java.exe
if defined JAVA_HOME goto findJavaFromJavaHome

set JAVA_EXE=java.exe
%JAVA_EXE% -version >NUL 2>&1
if %ERRORLEVEL% equ 0 goto execute

echo ERROR: JAVA_HOME is not set and no 'java' command could be found in your PATH.
goto error

:findJavaFromJavaHome
set JAVA_HOME=%JAVA_HOME:"=%
set JAVA_EXE=%JAVA_HOME%/bin/java.exe

if exist "%JAVA_EXE%" goto execute

echo ERROR: JAVA_HOME is set to an invalid directory: %JAVA_HOME%
goto error

:execute
@REM Check if wrapper jar exists, if not download it
set WRAPPER_JAR="%MAVEN_PROJECTBASEDIR%\.mvn\wrapper\maven-wrapper.jar"

if exist %WRAPPER_JAR% (
    "%JAVA_EXE%" %MAVEN_OPTS% ^
        -classpath %WRAPPER_JAR% ^
        %WRAPPER_LAUNCHER% %*
) else (
    @REM Download maven-wrapper.jar if not present
    echo Downloading Maven Wrapper...
    for /f "tokens=* USEBACKQ" %%a in (`type "%MAVEN_PROJECTBASEDIR%\.mvn\wrapper\maven-wrapper.properties" ^| findstr "wrapperUrl"`) do set WRAPPER_URL=%%a
    set WRAPPER_URL=%WRAPPER_URL:wrapperUrl=%
    set WRAPPER_URL=%WRAPPER_URL:~1%

    @REM Use PowerShell to download
    powershell -Command "& {Invoke-WebRequest -Uri 'https://repo.maven.apache.org/maven2/org/apache/maven/wrapper/maven-wrapper/3.3.2/maven-wrapper-3.3.2.jar' -OutFile '%MAVEN_PROJECTBASEDIR%\.mvn\wrapper\maven-wrapper.jar'}" >NUL 2>&1

    if exist %WRAPPER_JAR% (
        "%JAVA_EXE%" %MAVEN_OPTS% ^
            -classpath %WRAPPER_JAR% ^
            %WRAPPER_LAUNCHER% %*
    ) else (
        echo ERROR: Could not download Maven Wrapper JAR.
        echo Please install Maven manually: https://maven.apache.org/download.cgi
        goto error
    )
)

goto end

:error
set ERROR_CODE=1

:end
@endlocal & set ERROR_CODE=%ERROR_CODE%
exit /B %ERROR_CODE%
