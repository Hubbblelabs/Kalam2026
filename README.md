# Kalam 2026 - Event Management Platform

A comprehensive event management platform built with Next.js, Fastify, MongoDB, and Docker.

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Cloudflare                               │
│              (DNS, SSL, CDN, WAF, Rate Limiting)                │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                      NGINX (Reverse Proxy)                       │
│                    (Docker Container: nginx)                     │
└─────────────────────────────────────────────────────────────────┘
                    │                       │
                    ▼                       ▼
┌─────────────────────────┐   ┌─────────────────────────────────┐
│      Frontend           │   │           Backend               │
│      (Next.js)          │   │          (Fastify)              │
│   Docker: frontend      │   │       Docker: backend           │
│      Port: 3000         │   │         Port: 4000              │
└─────────────────────────┘   └─────────────────────────────────┘
                                            │
                                            ▼
                              ┌─────────────────────────────────┐
                              │         MongoDB                 │
                              │      Docker: mongodb            │
                              │        Port: 27017              │
                              └─────────────────────────────────┘
```

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 14 (App Router), Tailwind CSS, TypeScript |
| **Backend** | Fastify, Node.js (LTS), TypeScript |
| **Database** | MongoDB with WiredTiger |
| **Containerization** | Docker, Docker Compose |
| **Reverse Proxy** | NGINX |
| **Edge/CDN** | Cloudflare |
| **Payments** | PhonePe Payment Gateway |
| **Email** | Google Workspace SMTP |
| **Auth** | JWT (Access + Refresh tokens), bcrypt |

## 📁 Project Structure

```
Kalam2026/
├── frontend/                 # Next.js application
│   ├── src/
│   │   ├── app/             # App Router pages
│   │   ├── components/      # React components
│   │   ├── lib/             # Utility functions
│   │   ├── hooks/           # Custom hooks
│   │   ├── types/           # TypeScript types
│   │   └── styles/          # Global styles
│   ├── public/              # Static assets
│   ├── Dockerfile
│   └── package.json
├── backend/                  # Fastify API server
│   ├── src/
│   │   ├── routes/          # API routes
│   │   ├── controllers/     # Request handlers
│   │   ├── services/        # Business logic
│   │   ├── models/          # MongoDB models
│   │   ├── plugins/         # Fastify plugins
│   │   ├── middlewares/     # Custom middlewares
│   │   ├── utils/           # Helper functions
│   │   └── types/           # TypeScript types
│   ├── Dockerfile
│   └── package.json
├── nginx/                    # NGINX configuration
│   ├── nginx.conf
│   ├── conf.d/
│   └── Dockerfile
├── docker-compose.yml        # Docker Compose config
├── docker-compose.dev.yml    # Development overrides
├── .env.example              # Environment template
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Docker & Docker Compose
- Node.js 20+ (for local development)
- pnpm (`corepack enable && corepack prepare pnpm@latest --activate`)
- Git

### Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/Kalam2026.git
   cd Kalam2026
   ```

2. **Create environment files**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Start with Docker Compose (Development)**
   ```bash
   docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build
   ```

4. **Or run locally without Docker**
   ```bash
   # Terminal 1 - Backend
   cd backend
   pnpm install
   pnpm run dev

   # Terminal 2 - Frontend
   cd frontend
   pnpm install
   pnpm run dev
   ```

### Production Deployment

```bash
docker-compose up -d --build
```

## 🔧 Configuration

### Environment Variables

See `.env.example` for all available configuration options.

### Cloudflare Setup

1. Add your domain to Cloudflare
2. Update nameservers at your registrar
3. Enable SSL (Full/Strict mode)
4. Configure firewall rules
5. Enable CDN caching

### Server Setup (Ubuntu)

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER

# Install Docker Compose
sudo apt install docker-compose-plugin

# Configure UFW
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 22/tcp
sudo ufw enable
```

## 📧 Email Configuration

Configure Google Workspace SMTP with app passwords:
- `products@siet.ac.in` - Transactional emails
- `support@siet.ac.in` - Support emails

Ensure SPF, DKIM, and DMARC are configured in DNS.

## 💳 Payment Integration

PhonePe Payment Gateway with:
- Server-to-server verification
- Idempotent webhook handling
- Secure callback validation

## 🔐 Security Features

- JWT-based authentication (Access + Refresh tokens)
- Password hashing with bcrypt
- Rate limiting (Fastify + NGINX)
- Cloudflare WAF protection
- NGINX allows only Cloudflare IPs
- UFW firewall on server

## 📜 License

Private - All rights reserved.
