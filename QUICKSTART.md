# Kalam 2026 - Quick Start Guide

## 🚀 Local Development Setup

### Prerequisites
- Node.js 20+
- pnpm (`corepack enable && corepack prepare pnpm@latest --activate`)
- Docker & Docker Compose
- Git

### Step 1: Clone & Setup Environment

```powershell
cd d:\Github\Kalam2026

# Copy environment file
Copy-Item .env.example .env

# Edit .env with your configuration
notepad .env
```

### Step 2: Start with Docker (Recommended)

```powershell
# Start all services in development mode
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build
```

Access:
- Frontend: http://localhost:3000
- Backend API: http://localhost:4000/api
- MongoDB: localhost:27017

### Step 3: Or Run Without Docker

**Terminal 1 - Backend:**
```powershell
cd backend
pnpm install
pnpm run dev
```

**Terminal 2 - Frontend:**
```powershell
cd frontend
pnpm install
pnpm run dev
```

---

## 🖥️ Production Deployment (Ubuntu Server)

### Step 1: Server Setup

```bash
# SSH to your server
ssh user@your-server-ip

# Download and run setup script
curl -fsSL https://raw.githubusercontent.com/your-repo/main/scripts/setup-server.sh | sudo bash
```

### Step 2: Clone Repository

```bash
cd /opt/kalam2026
git clone https://github.com/your-org/Kalam2026.git .
```

### Step 3: Configure Environment

```bash
cp .env.example .env
nano .env
```

**Important environment variables to set:**
- `JWT_ACCESS_SECRET` - Strong random string (32+ chars)
- `JWT_REFRESH_SECRET` - Strong random string (32+ chars)
- `MONGODB_URI` - Use `mongodb://mongodb:27017/kalam2026` for Docker
- `PHONEPE_*` - PhonePe payment credentials
- `SMTP_*` - Google Workspace SMTP settings

### Step 4: SSL Certificates (Cloudflare)

Since you're using Cloudflare in Full/Strict mode, create origin certificates:

1. Go to Cloudflare Dashboard → SSL/TLS → Origin Server
2. Create Certificate
3. Save cert and key to:
   - `/opt/kalam2026/nginx/ssl/cert.pem`
   - `/opt/kalam2026/nginx/ssl/key.pem`

### Step 5: Deploy

```bash
docker compose up -d --build
```

### Step 6: Verify

```bash
# Check running containers
docker compose ps

# Check logs
docker compose logs -f

# Health check
curl http://localhost/health
```

---

## 🔧 Common Commands

```bash
# View logs
docker compose logs -f [service]

# Restart a service
docker compose restart [service]

# Stop all services
docker compose down

# Rebuild and restart
docker compose up -d --build

# Enter a container
docker exec -it kalam-backend sh

# Database backup
./scripts/backup-db.sh
```

---

## 📋 Cloudflare Configuration

1. **DNS**: Add A record pointing to your server IP
2. **SSL/TLS**: Set to Full (Strict)
3. **Page Rules**: 
   - `*yourdomain.com/api/*` → Cache Level: Bypass
4. **Firewall Rules**:
   - Rate limit on `/api/auth/*` endpoints
5. **Security**:
   - Enable Bot Fight Mode
   - Set Security Level to Medium

---

## 📧 Google Workspace SMTP Setup

1. Enable 2FA on Google account
2. Generate App Password: 
   - Google Account → Security → 2-Step Verification → App passwords
3. Use app password in `SMTP_PASS_PRODUCTS` and `SMTP_PASS_SUPPORT`

---

## 💳 PhonePe Integration

1. Register at PhonePe Business
2. Get Merchant ID and Salt Key from dashboard
3. Configure webhook URL: `https://yourdomain.com/api/payments/callback`
4. Whitelist PhonePe IPs in Cloudflare
