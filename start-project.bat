@echo off
echo Starting AI Skill Gap Analyzer Project...
echo.

echo Starting Backend (Node.js) on port 5000...
start "Backend" cmd /k "cd backend && npm start"

echo Starting ML Engine (Flask) on port 8000...
start "ML Engine" cmd /k "cd ml-engine && python app.py"

echo Starting Frontend (React) on port 3000...
start "Frontend" cmd /k "cd frontend && npm start"

echo.
echo All services are starting...
echo Backend: http://localhost:5000
echo ML Engine: http://localhost:8000
echo Frontend: http://localhost:3000
echo.
pause 