# AutoCare Database Documentation

## PostgreSQL Setup with Docker

### Quick Start

```bash
# Start database
make db-up

# Stop database
make db-down

# Reset database (destroys all data)
make db-reset
```

## Services

### PostgreSQL
- **Image**: postgres:15-alpine
- **Port**: 5432
- **Database**: autocare
- **User**: autocare
- **Password**: password123

### PgAdmin
- **Image**: dpage/pgadmin4:latest
- **Port**: 5050
- **URL**: http://localhost:5050
- **Email**: admin@autocare.local
- **Password**: admin123

## Connection Details

### Application Connection
```
DATABASE_URI=postgres://autocare:password123@localhost:5432/autocare
```

### Direct Connection (psql)
```bash
psql postgres://autocare:password123@localhost:5432/autocare
```

### PgAdmin Connection
Server will be automatically configured. If manual setup is needed:
- **Host**: postgres (when running in Docker network) or localhost
- **Port**: 5432
- **Database**: autocare
- **Username**: autocare
- **Password**: password123

## Database Schema

PayloadCMS automatically creates and manages tables for:

### Core Tables
- `users` - User accounts (customers, technicians, admins)
- `services` - Service catalog
- `bookings` - Service bookings/appointments
- `media` - File uploads and images

### System Tables
- `payload_preferences` - User preferences
- `payload_migrations` - Migration history

## Development Workflow

### 1. Start Database
```bash
# Using Makefile
make db-up

# Or Docker Compose
docker-compose up -d postgres pgadmin
```

### 2. Run Migrations
PayloadCMS handles migrations automatically. When you start the CMS, it will:
- Create missing tables
- Update schema changes
- Run any pending migrations

### 3. Access Database

**Via PgAdmin (Recommended for GUI):**
1. Open http://localhost:5050
2. Login with admin@autocare.local / admin123
3. Server "AutoCare Local" should be auto-configured

**Via Command Line:**
```bash
# Connect to database
psql postgres://autocare:password123@localhost:5432/autocare

# List tables
\dt

# Describe a table
\d users

# Exit
\q
```

## Backup & Restore

### Create Backup
```bash
# Using Makefile
make db-backup

# Or directly with Docker
docker-compose exec postgres pg_dump -U autocare autocare > backup.sql
```

### Restore from Backup
```bash
# Stop applications first
make stop

# Reset database
make db-reset

# Wait for database to be ready, then restore
docker-compose exec -T postgres psql -U autocare autocare < backup.sql
```

### Automated Backups
For production, consider setting up automated backups:

```bash
# Add to cron for daily backups
0 2 * * * cd /path/to/autocare && make db-backup
```

## Troubleshooting

### Database won't start
```bash
# Check Docker logs
docker-compose logs postgres

# Common solutions:
# 1. Remove old volumes
docker-compose down -v

# 2. Check port conflicts
lsof -i :5432

# 3. Restart Docker
```

### Connection issues
```bash
# Test connection
docker-compose exec postgres pg_isready -U autocare -d autocare

# Check if services are running
docker-compose ps

# View logs
docker-compose logs postgres
```

### PgAdmin issues
```bash
# Reset PgAdmin data
docker-compose down
docker volume rm autocare-monorepo_pgadmin_data
docker-compose up -d pgadmin
```

### Performance Issues
```bash
# Check database size
docker-compose exec postgres psql -U autocare autocare -c "SELECT pg_size_pretty(pg_database_size('autocare'));"

# Check table sizes
docker-compose exec postgres psql -U autocare autocare -c "
SELECT schemaname,tablename,pg_size_pretty(size) as size, pg_size_pretty(total_size) as total_size
FROM (
  SELECT schemaname, tablename, pg_relation_size(schemaname||'.'||tablename) as size,
         pg_total_relation_size(schemaname||'.'||tablename) as total_size
  FROM pg_tables WHERE schemaname = 'public'
) x ORDER BY total_size DESC;
"
```

## Production Considerations

### Environment Variables
```bash
DATABASE_URI=postgres://username:password@host:port/database
POSTGRES_SSL_MODE=require  # For production
```

### Security
- Use strong passwords
- Enable SSL/TLS
- Configure proper firewall rules
- Regular security updates
- Monitor connections

### Performance
- Configure appropriate connection pooling
- Set up read replicas if needed
- Monitor query performance
- Regular VACUUM and ANALYZE

### Monitoring
- Set up database monitoring (e.g., pgAdmin, Grafana)
- Monitor disk space
- Track slow queries
- Set up alerts for critical metrics