# 🚀 Deployment Guide - Alzheimer's AI Detection System

## Quick Start

### Prerequisites
```bash
# Ensure you have the following installed:
- Node.js >= 18.0.0
- pnpm (recommended) or npm >= 8.0.0
```

### Local Development

```bash
# 1. Install dependencies
pnpm install

# 2. Start development server
pnpm dev

# 3. Open browser
# Navigate to http://localhost:5173
```

### Production Build

```bash
# Build for production
pnpm build

# Preview production build locally
pnpm preview
```

## 📦 Build Output

The production build will be created in the `dist/` directory:
```
dist/
├── assets/           # Optimized JS, CSS, and images
├── index.html        # Entry point
└── ...
```

## 🌐 Deployment Options

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Deploy**
```bash
vercel
```

3. **Production Deployment**
```bash
vercel --prod
```

**Vercel Configuration** (`vercel.json`):
```json
{
  "buildCommand": "pnpm build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

### Option 2: Netlify

1. **Install Netlify CLI**
```bash
npm install -g netlify-cli
```

2. **Deploy**
```bash
netlify deploy
```

3. **Production Deployment**
```bash
netlify deploy --prod
```

**Netlify Configuration** (`netlify.toml`):
```toml
[build]
  command = "pnpm build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Option 3: AWS S3 + CloudFront

1. **Build the project**
```bash
pnpm build
```

2. **Upload to S3**
```bash
aws s3 sync dist/ s3://your-bucket-name --delete
```

3. **Invalidate CloudFront cache**
```bash
aws cloudfront create-invalidation \
  --distribution-id YOUR_DIST_ID \
  --paths "/*"
```

### Option 4: Docker

**Dockerfile**:
```dockerfile
FROM node:18-alpine as builder

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install
COPY . .
RUN pnpm build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**nginx.conf**:
```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

**Build and Run**:
```bash
docker build -t alzheimers-ai .
docker run -p 80:80 alzheimers-ai
```

### Option 5: GitHub Pages

1. **Install gh-pages**
```bash
pnpm add -D gh-pages
```

2. **Add to package.json**
```json
{
  "scripts": {
    "predeploy": "pnpm build",
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://yourusername.github.io/alzheimers-ai"
}
```

3. **Deploy**
```bash
pnpm deploy
```

## 🔧 Environment Variables

### Development
Create `.env` file:
```env
VITE_API_URL=http://localhost:3000/api
VITE_MODEL_VERSION=v2.1
VITE_ENABLE_ANALYTICS=true
```

### Production
Set in your hosting platform:
```env
VITE_API_URL=https://api.yourdomain.com
VITE_MODEL_VERSION=v2.1
VITE_ENABLE_ANALYTICS=true
VITE_SENTRY_DSN=your-sentry-dsn
```

## 📊 Performance Optimization

### Applied Optimizations
- ✅ Code splitting
- ✅ Tree shaking
- ✅ Minification
- ✅ Gzip compression
- ✅ Asset optimization
- ✅ Lazy loading ready

### Additional Recommendations

1. **Enable Compression**
```nginx
gzip on;
gzip_comp_level 6;
gzip_min_length 1000;
gzip_types text/plain text/css application/json application/javascript;
```

2. **Cache Static Assets**
```nginx
location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

3. **CDN Integration**
- Use CloudFlare, AWS CloudFront, or similar
- Configure edge caching
- Enable HTTP/2

## 🔒 Security Considerations

### Headers Configuration

```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';" always;
```

### HTTPS
- Always use HTTPS in production
- Obtain SSL certificate (Let's Encrypt recommended)
- Redirect HTTP to HTTPS

## 📈 Monitoring

### Recommended Tools
- **Error Tracking**: Sentry
- **Analytics**: Google Analytics, Plausible
- **Uptime Monitoring**: UptimeRobot
- **Performance**: Lighthouse CI

### Integration Example (Sentry)

```typescript
// src/main.tsx
import * as Sentry from "@sentry/react";

if (import.meta.env.PROD) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    environment: "production",
    tracesSampleRate: 1.0,
  });
}
```

## 🧪 Pre-Deployment Checklist

- [ ] Run production build locally
- [ ] Test all routes
- [ ] Check responsive design
- [ ] Verify all features work
- [ ] Test image uploads
- [ ] Check chart rendering
- [ ] Verify navigation
- [ ] Test toast notifications
- [ ] Check accessibility
- [ ] Review console for errors
- [ ] Test on different browsers
- [ ] Optimize images
- [ ] Update environment variables
- [ ] Configure error tracking
- [ ] Set up analytics
- [ ] Configure CDN
- [ ] Enable HTTPS
- [ ] Set up monitoring

## 🔄 CI/CD Pipeline

### GitHub Actions Example

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8
          
      - name: Install dependencies
        run: pnpm install
        
      - name: Build
        run: pnpm build
        env:
          VITE_API_URL: ${{ secrets.API_URL }}
          
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
          working-directory: ./
```

## 🌍 Domain Configuration

### Custom Domain Setup

1. **Update DNS Records**
```
Type: CNAME
Name: www
Value: your-deployment.vercel.app
```

2. **Configure in Hosting Platform**
- Add custom domain
- Verify ownership
- Enable SSL
- Configure redirects

## 📊 Performance Benchmarks

### Target Metrics
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Lighthouse Score**: > 90
- **Bundle Size**: < 500KB (gzipped)

### Current Performance
- ✅ Optimized build size
- ✅ Code splitting implemented
- ✅ Lazy loading ready
- ✅ Image optimization ready

## 🆘 Troubleshooting

### Common Issues

**Issue**: Routes not working on refresh
**Solution**: Configure server to serve index.html for all routes

**Issue**: Environment variables not working
**Solution**: Ensure they start with `VITE_` prefix

**Issue**: Build fails
**Solution**: Clear node_modules and reinstall

```bash
rm -rf node_modules
rm pnpm-lock.yaml
pnpm install
```

**Issue**: Assets not loading
**Solution**: Check base path configuration in vite.config.ts

## 📞 Support

For deployment issues:
- Check documentation
- Review error logs
- Contact support team
- Create GitHub issue

---

**Happy Deploying! 🚀**

Your professional Alzheimer's AI Detection System is ready for the world.
