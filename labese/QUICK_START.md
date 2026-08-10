# 🚀 Quick Start: Configure Vercel Blob Storage in 2 Minutes

## ✅ Step 1: Connect Your Existing Blob Storage

You already have `fbst-uploads` created! Now just connect it:

1. Go to: https://vercel.com/dashboard (Storage tab)
2. Click on **fbst-uploads** (your Blob Store)
3. Click **"Connect to Project"** or **"Connect"**
4. Select your **Labese-SENEGAL** project
5. ✅ Done! The `BLOB_READ_WRITE_TOKEN` environment variable is auto-added

## ✅ Step 2: Set Admin Login Credentials

1. Go to **Settings** → **Environment Variables**
2. Add these two:

```
Name: ADMIN_EMAIL
Value: admin@labese.com
Environments: All (Production, Preview, Development)
```

```
Name: ADMIN_PASSWORD  
Value: Nkurunziza123
Environments: All (Production, Preview, Development)
```

3. Click **Save** after each

## ✅ Step 3: Redeploy

1. Go to **Deployments** tab
2. Click **⋮** (3 dots) on latest deployment
3. Click **Redeploy**
4. ✅ Wait for build to complete (~2-3 minutes)

## ✅ Step 4: Login to Admin

1. Visit: `https://your-site.vercel.app/admin/login`
2. Email: `admin@labese.com`
3. Password: `Nkurunziza123`
4. 🎉 You're in!

---

## 📋 Environment Variables Checklist

After completing steps above, you should have these in Vercel:

**Auto-added by Blob:**
- ✅ BLOB_READ_WRITE_TOKEN

**Manually added:**
- ✅ ADMIN_EMAIL
- ✅ ADMIN_PASSWORD

---

## 🏗️ Architecture

This project uses **Vercel Blob for EVERYTHING**:
- `/images/{id}.{ext}` - Uploaded images (public)
- `/metadata/{id}.json` - Image metadata (private JSON)
- `/data/{collection}.json` - Site data (programmes, initiatives, etc.)

No KV needed! Everything is stored as JSON files in Blob.

---

## 🆘 Problems?

**Build failing?** Check Vercel build logs for specific error

**Can't login?** Double-check ADMIN_EMAIL and ADMIN_PASSWORD are set exactly as shown

**Images not uploading?** Make sure BLOB_READ_WRITE_TOKEN exists and fbst-uploads is connected
