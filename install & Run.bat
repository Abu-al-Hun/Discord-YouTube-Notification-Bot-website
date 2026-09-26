@echo off
setlocal enabledelayedexpansion
title Discord YouTube Notification Bot
color 0B

:menu
cls
echo ==================================================
echo    Discord YouTube Notification Bot
echo    Copyright (c) 2023 - 2026 Hany Samir Mansour
echo ==================================================
echo.
echo   [1] Install ^& Run
echo   [2] Install Dependencies Only
echo   [3] Run Bot
echo   [4] Project Info
echo   [5] Exit
echo.
echo ==================================================
set /p choice="Select an option: "

if "%choice%"=="1" goto installAndRun
if "%choice%"=="2" goto installOnly
if "%choice%"=="3" goto runOnly
if "%choice%"=="4" goto info
if "%choice%"=="5" goto exit
goto menu

:checkNode
where node >nul 2>nul
if errorlevel 1 (
    color 0C
    echo.
    echo [ERROR] Node.js is not installed or not in PATH.
    echo Please install Node.js 18 or higher from https://nodejs.org/
    echo.
    pause
    exit /b 1
)
exit /b 0

:installAndRun
cls
echo ==================================================
echo    Install ^& Run
echo ==================================================
echo.
call :checkNode
if errorlevel 1 goto menu

echo [1/2] Installing dependencies...
echo.
call npm install
if errorlevel 1 (
    color 0C
    echo.
    echo [ERROR] Failed to install dependencies.
    pause
    goto menu
)

echo.
echo [2/2] Starting the bot...
echo.
call node index.js
echo.
echo Bot has stopped
pause
goto menu

:installOnly
cls
echo ==================================================
echo    Install Dependencies
echo ==================================================
echo.
call :checkNode
if errorlevel 1 goto menu

echo Installing dependencies...
echo.
call npm install
if errorlevel 1 (
    color 0C
    echo.
    echo [ERROR] Failed to install dependencies.
    pause
    goto menu
)

echo.
echo [SUCCESS] Dependencies installed successfully.
pause
goto menu

:runOnly
cls
echo ==================================================
echo    Run Bot
echo ==================================================
echo.
call :checkNode
if errorlevel 1 goto menu

if not exist "node_modules" (
    color 0E
    echo [WARNING] Dependencies are not installed.
    echo Please run option [2] first.
    echo.
    pause
    goto menu
)

if not exist "config.js" (
    color 0C
    echo [ERROR] config.js not found.
    pause
    goto menu
)

echo Starting the bot...
echo.
call node index.js
echo.
echo Bot has stopped.
pause
goto menu

:info
cls
echo ==================================================
echo    Project Info
echo ==================================================
echo.
echo   Name      : Discord YouTube Notification Bot
echo   Version   : 1.0.0
echo.
echo   Author    : Hany Samir Mansour ^(Abu Al-houn^)
echo   Discord   : abualhun
echo   Email     : support@abualhoun.dpdns.org
echo   Website   : https://abualhoun.dpdns.org/
echo.
echo   Copyright : (c) 2023 - 2026 Hany Samir Mansour
echo   License   : All rights reserved.
echo               Commercial use is strictly prohibited.
echo.
echo --------------------------------------------------
echo   Description:
echo   A lightweight Discord bot that syncs YouTube
echo   videos on demand, caches them locally, and sends
echo   notifications only for videos published today.
echo.
echo --------------------------------------------------
echo   Commands:
echo   -list           Show cached videos dropdown
echo   -sync           Fetch new videos (Admin only)
echo   -deleteproject  Delete a cached video (Admin only)
echo   -help           Show help menu (Admin only)
echo.
echo --------------------------------------------------
echo   Requirements:
echo   - Node.js 18 or higher
echo   - Discord bot token
echo   - YouTube Data API v3 key
echo.
echo ==================================================
pause
goto menu

:exit
cls
echo.
echo Thank you for using Discord YouTube Notification Bot.
echo.
echo Copyright (c) 2023 - 2026 Hany Samir Mansour
echo.
timeout /t 2 >nul
exit /b 0