# F1 Stats Data

A simple pet project with microservices for Formula 1 data:
- user authentication
- news
- stats and driver comparison
- Next.js web interface

## Stack
- Backend: FastAPI (multiple services)
- Frontend: Next.js + TypeScript
- Database: PostgreSQL
- Infrastructure: Docker Compose

## Project Structure
- `backend/auth-service` - authentication service
- `backend/news-service` - news service
- `backend/stats-service` - statistics service
- `frontend` - client application
- `scripts/init.sql` - SQL initialization script
- `docker-compose.yml` - starts all services

## Quick Start
1. Clone the repository:
   ```bash
   git clone https://github.com/IgorSB0005/F1-Stats-Data
   cd F1-Stats-Data
   ```
2. Run the project:
   ```bash
   docker-compose up --build
   ```
3. Open the frontend in your browser:
   - http://localhost:3000

## Stop
```bash
docker-compose down
```

## Note
If you want to run services locally without Docker, configure `.env` and install dependencies for each service separately.
