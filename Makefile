# AutoCare Project Makefile

.PHONY: help dev build stop clean logs db-up db-down db-reset db-backup db-restore

# Default target
help:
	@echo "AutoCare Development Commands:"
	@echo ""
	@echo "🚀 Development:"
	@echo "  make dev          Start all services (database + apps)"
	@echo "  make build        Build all applications"
	@echo "  make stop         Stop all services"
	@echo "  make clean        Stop and remove all containers/volumes"
	@echo ""
	@echo "🗄️  Database:"
	@echo "  make db-up        Start PostgreSQL and PgAdmin"
	@echo "  make db-down      Stop database services"
	@echo "  make db-reset     Reset database (⚠️  destroys all data)"
	@echo "  make db-backup    Create database backup"
	@echo "  make db-logs      Show database logs"
	@echo ""
	@echo "📊 Monitoring:"
	@echo "  make logs         Show all service logs"
	@echo "  make status       Show service status"
	@echo ""
	@echo "🔧 Utilities:"
	@echo "  make install      Install dependencies"
	@echo "  make types        Generate PayloadCMS types"

# Development commands
dev: db-up
	@echo "🚀 Starting development environment..."
	@pnpm install
	@pnpm generate:types
	@pnpm dev

build:
	@echo "🏗️ Building applications..."
	@pnpm build

stop:
	@echo "⏹️ Stopping all services..."
	@docker-compose down
	@pkill -f "next\|payload" || true

clean:
	@echo "🧹 Cleaning up containers and volumes..."
	@docker-compose down -v
	@docker system prune -f

# Database commands
db-up:
	@echo "🗄️ Starting PostgreSQL and PgAdmin..."
	@docker-compose up -d postgres pgadmin
	@echo "✅ Database services started!"
	@echo "📊 PgAdmin: http://localhost:5050 (admin@autocare.local / admin123)"
	@echo "🔌 PostgreSQL: localhost:5432 (autocare / password123)"

db-down:
	@echo "⏹️ Stopping database services..."
	@docker-compose down

db-reset:
	@echo "⚠️  This will destroy all database data!"
	@read -p "Are you sure? [y/N] " -n 1 -r; \
	if [[ $$REPLY =~ ^[Yy]$$ ]]; then \
		echo ""; \
		echo "🗑️ Resetting database..."; \
		docker-compose down -v; \
		docker-compose up -d postgres pgadmin; \
		echo "✅ Database reset complete!"; \
	else \
		echo ""; \
		echo "❌ Reset cancelled."; \
	fi

db-backup:
	@echo "💾 Creating database backup..."
	@mkdir -p ./backups
	@docker-compose exec postgres pg_dump -U autocare autocare > ./backups/autocare-$(shell date +%Y%m%d-%H%M%S).sql
	@echo "✅ Backup created in ./backups/"

db-logs:
	@docker-compose logs -f postgres

# Monitoring commands
logs:
	@docker-compose logs -f

status:
	@docker-compose ps

# Utility commands
install:
	@echo "📦 Installing dependencies..."
	@pnpm install

types:
	@echo "🔄 Generating PayloadCMS types..."
	@pnpm generate:types