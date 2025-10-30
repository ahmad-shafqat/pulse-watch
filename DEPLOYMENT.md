# Vercel Deployment Guide for Pulse Watches

This guide will help you manually deploy your Pulse Watches e-commerce application to Vercel.

## Prerequisites

1. A Vercel account (sign up at https://vercel.com)
2. MongoDB Atlas account for the database (https://www.mongodb.com/cloud/atlas)
3. Your environment variables ready

## Deployment Options

You have two options for deploying this monorepo project:

### Option A: Deploy Frontend and Backend Separately (Recommended)

#### 1. Deploy Backend (Server)

**Step 1:** Create a new project on Vercel
- Go to https://vercel.com/new
- Import your GitHub repository: `ahmad-shafqat/pulse-watch`
- Click "Import"

**Step 2:** Configure the backend deployment
- **Project Name:** `pulse-watch-api` (or your preferred name)
- **Framework Preset:** Other
- **Root Directory:** `server`
- **Build Command:** Leave empty (not needed for Node.js)
- **Output Directory:** Leave empty
- **Install Command:** `npm install`

**Step 3:** Add Environment Variables
Click on "Environment Variables" and add these:
```
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_jwt_key_min_32_characters
CLIENT_URL=https://your-frontend-domain.vercel.app
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
NODE_ENV=production
```

**Step 4:** Deploy
- Click "Deploy"
- Wait for deployment to complete
- Note your backend URL (e.g., `https://pulse-watch-api.vercel.app`)

#### 2. Deploy Frontend (Client)

**Step 1:** Create another Vercel project
- Go to https://vercel.com/new again
- Import the same GitHub repository
- Click "Import"

**Step 2:** Configure the frontend deployment
- **Project Name:** `pulse-watch` (or your preferred name)
- **Framework Preset:** Vite
- **Root Directory:** `client`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

**Step 3:** Add Environment Variables
```
VITE_API_URL=https://pulse-watch-api.vercel.app/api
```
(Replace with your actual backend URL from Step 1.4)

**Step 4:** Deploy
- Click "Deploy"
- Wait for deployment to complete
- Your app is now live! 🎉

---

### Option B: Deploy as Monorepo (Advanced)

If you prefer to deploy both in a single Vercel project, follow these steps:

**Step 1:** Create a new project on Vercel
- Go to https://vercel.com/new
- Import your GitHub repository: `ahmad-shafqat/pulse-watch`

**Step 2:** Configure deployment
- **Project Name:** `pulse-watch`
- **Framework Preset:** Other
- **Root Directory:** Leave as `/` (root)
- **Build Command:** `cd client && npm install && npm run build`
- **Output Directory:** `client/dist`
- **Install Command:** `cd server && npm install`

**Step 3:** The `vercel.json` file has been created in the root for you with proper configuration.

**Step 4:** Add ALL Environment Variables
```
# Backend variables
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_jwt_key
CLIENT_URL=https://your-app.vercel.app
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
NODE_ENV=production

# Frontend variables
VITE_API_URL=/api
```

**Step 5:** Deploy and verify

---

## Setting Up MongoDB Atlas

1. Go to https://mongodb.com/cloud/atlas
2. Create a free cluster
3. Create a database user (username & password)
4. Whitelist all IPs: `0.0.0.0/0` (for Vercel's dynamic IPs)
5. Get your connection string from "Connect" → "Connect your application"
6. Replace `<password>` with your database user password
7. Add your database name at the end: `mongodb+srv://user:pass@cluster.mongodb.net/pulse-watches?retryWrites=true&w=majority`

## Setting Up Gmail for Nodemailer

1. Go to your Google Account settings
2. Enable 2-Step Verification
3. Generate an App Password:
   - Go to Security → 2-Step Verification → App passwords
   - Select "Mail" and your device
   - Copy the 16-character password
4. Use this as your `EMAIL_PASS` environment variable

## Post-Deployment Steps

1. **Update CORS:** Make sure your backend `CLIENT_URL` matches your frontend domain
2. **Test API endpoints:** Visit `https://your-backend-url.vercel.app/api/products`
3. **Seed Database:** Run the seed script locally pointing to your Atlas database:
   ```bash
   cd server
   node seed/seedProducts.js
   ```
4. **Test the Application:** Visit your frontend URL and test all features

## Vercel CLI Deployment (Alternative)

If you prefer using the CLI:

```powershell
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from project root
cd "C:\Users\Ahmad Shafqat\Desktop\New folder (2)\pulse-watches"
vercel

# Follow the prompts and configure as above
```

## Troubleshooting

### Backend Issues
- Check Vercel function logs in the dashboard
- Verify MongoDB connection string
- Ensure all environment variables are set

### Frontend Issues
- Verify `VITE_API_URL` points to correct backend
- Check browser console for errors
- Ensure API routes start with `/api`

### CORS Errors
- Make sure `CLIENT_URL` in backend env matches your frontend domain
- Check that CORS is properly configured in `server/app.js`

## Important Notes

- Vercel serverless functions have a 10-second timeout on Hobby plan
- MongoDB queries should be optimized for speed
- Images should be served from `/client/public/images/`
- Environment variables need to be set in Vercel dashboard, not in `.env` files

## Domain Setup (Optional)

After deployment, you can add a custom domain:
1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Update DNS records as instructed
5. Update environment variables to use new domain

---

**Your application is now ready to deploy! Choose Option A (separate deployments) for easier management.**

Need help? Check Vercel docs at https://vercel.com/docs
