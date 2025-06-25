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
- **Database**: MongoDB
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
- MongoDB

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

4. **Start MongoDB:**
   ```bash
   # Make sure MongoDB is running locally or update DATABASE_URI in apps/cms/.env
   ```

5. **Generate PayloadCMS types:**
   ```bash
   pnpm generate:types
   ```

6. **Start development servers:**
   ```bash
   pnpm dev
   ```

This will start:
- Next.js app at [http://localhost:3000](http://localhost:3000)
- PayloadCMS admin at [http://localhost:3001/admin](http://localhost:3001/admin)

## Available Scripts

```bash
# Development
pnpm dev          # Start all applications in development mode
pnpm build        # Build all applications
pnpm lint         # Lint all packages

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

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

[License information]