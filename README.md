# AutoCare Monorepo

A modern automotive care application built with **Next.js 15**, **PayloadCMS**, and **Turborepo**.

## Features

- 🚗 **Complete automotive services management**
- 📅 **Service booking system**
- 👥 **Customer and technician management**
- 🎨 **Modern UI with ShadCN/UI and Tailwind CSS**
- 🔥 **Fast development with Turborepo**
- 📱 **Responsive design**
- 🔒 **Type-safe with TypeScript**

## Tech Stack

- **Frontend**: Next.js 15 with App Router, React 19
- **Backend/CMS**: PayloadCMS
- **UI**: ShadCN/UI, Radix UI, Tailwind CSS
- **Build System**: Turborepo
- **Database**: PostgreSQL
- **Language**: TypeScript

## Project Structure

```
apps/
├── web/          # Next.js 15 frontend application
└── cms/          # PayloadCMS backend application

packages/
├── ui/                   # Shared UI components (ShadCN/UI)
├── typescript-config/    # Shared TypeScript configurations
└── tailwind-config/      # Shared Tailwind CSS configuration
```

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm
- Docker & Docker Compose (for local database)

### Installation

1. **Clone the repository:**
   ```bash
   git clone [repository-url]
   cd autocare-monorepo
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Set up environment files:**
   ```bash
   # Copy environment files
   cp apps/web/.env.example apps/web/.env.local
   cp apps/cms/.env.example apps/cms/.env
   ```

4. **Start PostgreSQL with Docker:**
   ```bash
   # Using Makefile (recommended)
   make db-up
   
   # Or using Docker Compose directly
   docker-compose up -d postgres pgadmin
   ```

5. **Generate PayloadCMS types:**
   ```bash
   pnpm generate:types
   ```

6. **Start development servers:**
   ```bash
   # Using Makefile (starts database + apps)
   make dev
   
   # Or manually
   pnpm dev
   ```

This will start:
- Next.js app at [http://localhost:3000](http://localhost:3000)
- PayloadCMS admin at [http://localhost:3001/admin](http://localhost:3001/admin)
- PgAdmin at [http://localhost:5050](http://localhost:5050) (admin@autocare.local / admin123)
- PostgreSQL at localhost:5432 (autocare / password123)

## Available Scripts

### Using Makefile (Recommended)
```bash
# Development
make dev          # Start all services (database + apps)
make build        # Build all applications
make stop         # Stop all services

# Database Management
make db-up        # Start PostgreSQL and PgAdmin
make db-down      # Stop database services
make db-reset     # Reset database (⚠️ destroys all data)
make db-backup    # Create database backup
make db-logs      # Show database logs

# Utilities
make install      # Install dependencies
make types        # Generate PayloadCMS types
make help         # Show all available commands
```

### Using pnpm directly
```bash
# Development
pnpm dev          # Start all applications in development mode
pnpm build        # Build all applications
pnpm lint         # Lint all packages

# Database
pnpm db:up        # Start PostgreSQL and PgAdmin
pnpm db:down      # Stop database services
pnpm db:reset     # Reset database
pnpm db:logs      # Show database logs

# PayloadCMS specific
pnpm generate:types  # Generate TypeScript types from PayloadCMS schema
```

## Applications

### Frontend (apps/web)
- Built with Next.js 15 and App Router
- Modern responsive UI with ShadCN/UI components
- Customer-facing booking interface
- Service catalog and information

### CMS (apps/cms)
- PayloadCMS admin interface
- Manage services, bookings, and customers
- Role-based access control
- Image uploads for services

## Collections

### Users
- Customer, technician, and admin roles
- Authentication and user management

### Services
- Automotive service catalog
- Categories: Oil Change, Brake Service, Tire Service, etc.
- Pricing and duration management

### Bookings
- Service appointment scheduling
- Vehicle information tracking
- Status management (pending, confirmed, completed, etc.)

### Media
- Image uploads and management
- Optimized sizes for different use cases

## Database Setup

### Local Development with Docker

The project uses PostgreSQL with Docker Compose for local development:

```bash
# Start database services
make db-up

# View database in PgAdmin
open http://localhost:5050
# Login: admin@autocare.local / admin123

# Connect to database directly
psql postgres://autocare:password123@localhost:5432/autocare
```

### Database Credentials

- **Database**: autocare
- **User**: autocare
- **Password**: password123
- **Host**: localhost
- **Port**: 5432

### Backup & Restore

```bash
# Create backup
make db-backup

# Reset database (⚠️ destroys data)
make db-reset
```

### Production Setup

For production, update the `DATABASE_URI` in your environment:

```bash
DATABASE_URI=postgres://user:password@your-db-host:5432/autocare
```

📖 **[Detailed Database Documentation](docs/DATABASE.md)**
🍎 **[macOS Quick Start Guide](docs/QUICK_START_MACOS.md)**

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

[License information]