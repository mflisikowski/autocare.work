# AutoCare Quick Start Guide - macOS

## Prerequisites Check

Before starting, ensure you have:

```bash
# Check Node.js version (should be 18+)
node --version

# Check if pnpm is installed
pnpm --version

# Check Docker
docker --version
docker-compose --version

# Check if ports are available
lsof -i :3000  # Next.js
lsof -i :3001  # PayloadCMS
lsof -i :5432  # PostgreSQL
lsof -i :5050  # PgAdmin
```

## Installation Prerequisites

### 1. Install Node.js (if not installed)
```bash
# Using Homebrew (recommended)
brew install node@18

# Or download from https://nodejs.org/
```

### 2. Install pnpm (if not installed)
```bash
# Using npm
npm install -g pnpm

# Or using Homebrew
brew install pnpm
```

### 3. Install Docker (if not installed)
```bash
# Download Docker Desktop for Mac
# https://docs.docker.com/desktop/install/mac-install/

# Or using Homebrew
brew install --cask docker
```

## Quick Setup (5 minutes)

### 1. Clone and Setup
```bash
# Clone repository
git clone [repository-url]
cd autocare-monorepo

# Install dependencies
pnpm install
```

### 2. Environment Configuration
```bash
# Copy environment files
cp apps/web/.env.example apps/web/.env.local
cp apps/cms/.env.example apps/cms/.env

# Optional: Customize database credentials in apps/cms/.env
```

### 3. Start Everything
```bash
# One command to rule them all!
make dev
```

This will:
- ✅ Start PostgreSQL database
- ✅ Start PgAdmin web interface
- ✅ Generate TypeScript types
- ✅ Start Next.js frontend
- ✅ Start PayloadCMS backend

### 4. Access Applications

After ~30 seconds, you should have:

- 🚀 **Frontend**: http://localhost:3000
- ⚙️ **CMS Admin**: http://localhost:3001/admin
- 🗄️ **PgAdmin**: http://localhost:5050
- 📊 **Database**: localhost:5432

## First Time Setup

### 1. Create CMS Admin User
1. Go to http://localhost:3001/admin
2. Create your first admin account
3. Login and explore the CMS

### 2. Add Sample Data
1. Go to "Services" collection
2. Create a few sample services
3. Go to "Media" to upload some images

### 3. View Frontend
1. Go to http://localhost:3000
2. See your sample data displayed

## Daily Development Workflow

### Start Working
```bash
# Start everything
make dev

# Or just database if apps are already running
make db-up
```

### During Development
```bash
# View database
open http://localhost:5050

# View logs
make logs

# Generate types after CMS changes
make types
```

### End of Day
```bash
# Stop everything
make stop

# Or keep database running, stop apps
docker-compose down && pkill -f "next|payload"
```

## Useful Commands

### Database Management
```bash
make db-up      # Start database
make db-down    # Stop database
make db-reset   # Reset database (⚠️ destroys data)
make db-backup  # Create backup
make db-logs    # View database logs
```

### Development
```bash
make dev        # Start everything
make build      # Build all apps
make stop       # Stop everything
make clean      # Clean everything (containers, volumes)
```

### Get Help
```bash
make help       # Show all available commands
```

## Troubleshooting macOS Specific Issues

### Port Already in Use
```bash
# Find what's using the port
lsof -i :3000  # or :3001, :5432, :5050

# Kill process by PID
kill -9 <PID>

# Or kill by name
pkill -f "next"
pkill -f "payload"
```

### Docker Issues
```bash
# Start Docker Desktop if not running
open -a Docker

# Reset Docker if having issues
docker system prune -a
docker volume prune
```

### Permission Issues
```bash
# Fix npm/pnpm permissions
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) ~/.pnpm

# Fix Docker permissions (if needed)
sudo chmod 666 /var/run/docker.sock
```

### Node.js Version Issues
```bash
# Use nvm to manage Node versions
brew install nvm
nvm install 18
nvm use 18
```

## Performance Tips for macOS

### 1. Docker Performance
```bash
# In Docker Desktop settings:
# - Increase memory to 4GB+
# - Enable "Use Rosetta for x86/amd64 emulation" (Apple Silicon)
# - Use "VirtioFS" file sharing
```

### 2. File Watching
```bash
# Increase file watch limits
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

### 3. Terminal Performance
```bash
# Use iTerm2 instead of default Terminal
brew install --cask iterm2

# Enable shell completion for make
echo 'complete -W "dev build stop clean db-up db-down db-reset db-backup help" make' >> ~/.zshrc
```

## IDE Setup

### VS Code (Recommended)
```bash
# Install VS Code
brew install --cask visual-studio-code

# Install useful extensions
code --install-extension bradlc.vscode-tailwindcss
code --install-extension ms-vscode.vscode-typescript-next
code --install-extension esbenp.prettier-vscode
code --install-extension ms-vscode.vscode-json
```

### Recommended VS Code Settings
```json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "files.associations": {
    "*.css": "tailwindcss"
  }
}
```

## Next Steps

1. ✅ Complete quick setup
2. 📖 Read the [Database Documentation](DATABASE.md)
3. 🎨 Explore ShadCN/UI components in `packages/ui/`
4. ⚙️ Customize PayloadCMS collections in `apps/cms/src/collections/`
5. 🚀 Build your first feature!

## Getting Help

- 📚 [Main README](../README.md)
- 🗄️ [Database Documentation](DATABASE.md)
- 🐛 Check Docker logs: `make logs`
- 💬 Create an issue if you're stuck

Happy coding! 🚀