#!/bin/bash
# ===========================================
# Kalam 2026 - Ubuntu Server Setup Script
# ===========================================
# Run this script on a fresh Ubuntu Server LTS installation
# Usage: chmod +x setup-server.sh && sudo ./setup-server.sh

set -e

echo "==========================================="
echo "Kalam 2026 - Server Setup"
echo "==========================================="

# Update system
echo "📦 Updating system packages..."
apt update && apt upgrade -y

# Install essential packages
echo "📦 Installing essential packages..."
apt install -y curl wget git nano htop ufw fail2ban

# Install Docker
echo "🐳 Installing Docker..."
curl -fsSL https://get.docker.com | sh
usermod -aG docker $SUDO_USER

# Install Docker Compose
echo "🐳 Installing Docker Compose..."
apt install -y docker-compose-plugin

# Configure UFW Firewall
echo "🔥 Configuring UFW Firewall..."
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp   # HTTPS
ufw --force enable

# Configure fail2ban
echo "🛡️ Configuring fail2ban..."
systemctl enable fail2ban
systemctl start fail2ban

# Create application directory
echo "📁 Creating application directory..."
mkdir -p /opt/kalam2026
chown $SUDO_USER:$SUDO_USER /opt/kalam2026

# Create swap file (2GB) if not exists
if [ ! -f /swapfile ]; then
    echo "💾 Creating swap file..."
    fallocate -l 2G /swapfile
    chmod 600 /swapfile
    mkswap /swapfile
    swapon /swapfile
    echo '/swapfile none swap sw 0 0' | tee -a /etc/fstab
fi

# Set timezone
echo "⏰ Setting timezone..."
timedatectl set-timezone Asia/Kolkata

# Enable automatic security updates
echo "🔄 Enabling automatic security updates..."
apt install -y unattended-upgrades
dpkg-reconfigure -plow unattended-upgrades

echo "==========================================="
echo "✅ Server setup complete!"
echo "==========================================="
echo ""
echo "Next steps:"
echo "1. Clone your repository: git clone <repo-url> /opt/kalam2026"
echo "2. Create .env file: cp .env.example .env"
echo "3. Configure your environment variables"
echo "4. Run: docker compose up -d --build"
echo ""
echo "⚠️  Please log out and log back in for Docker group changes to take effect"
