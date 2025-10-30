# Quick Vercel Deployment Steps

## Recommended: Deploy Frontend & Backend Separately

### 1️⃣ Deploy Backend First

1. Go to: https://vercel.com/new
2. Import repository: `ahmad-shafqat/pulse-watch`
3. Configure:
   - Name: `pulse-watch-api`
   - Root Directory: `server`
   - Build Command: (leave empty)
   - Install Command: `npm install`
   
4. Add Environment Variables:
   ```
   MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/pulse-watches
   JWT_SECRET=your_secret_key_min_32_chars
   CLIENT_URL=https://your-frontend.vercel.app
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_gmail_app_password
   NODE_ENV=production
   ```

5. Click **Deploy** and copy the URL (e.g., https://pulse-watch-api.vercel.app)

### 2️⃣ Deploy Frontend Second

1. Go to: https://vercel.com/new (again)
2. Import same repository: `ahmad-shafqat/pulse-watch`
3. Configure:
   - Name: `pulse-watch`
   - Root Directory: `client`
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   
4. Add Environment Variable:
   ```
   VITE_API_URL=https://pulse-watch-api.vercel.app/api
   ```
   (Use YOUR backend URL from step 1.5)

5. Click **Deploy** ✅

### 3️⃣ Update Backend Environment

1. Go back to your backend project in Vercel
2. Settings → Environment Variables
3. Update `CLIENT_URL` to your frontend URL (from step 2.5)
4. Redeploy backend from Deployments tab

### 4️⃣ Setup MongoDB Atlas

1. Create free cluster at: https://mongodb.com/cloud/atlas
2. Create database user
3. Whitelist IP: `0.0.0.0/0`
4. Get connection string and update `MONGO_URI` in backend

### 5️⃣ Test Your App! 🎉

Visit your frontend URL and test the application.

---

## Need Help?

Read the full guide: `DEPLOYMENT.md`
