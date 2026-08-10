# 🚀 Quick Start: Configure Vercel Storage in 5 Minutes

## ✅ Step 1: Add Vercel KV

1. Open: https://vercel.com/dashboard
2. Click your **Labese-SENEGAL** project
3. Click **Storage** tab (top menu)
4. Click **Create Database**
5. Choose **KV** → Name it `labese-kv` → Click **Create**
6. Click **Connect** to link to your project
7. ✅ Done! Environment variables auto-added

## ✅ Step 2: Add Vercel Blob  

1. Still in **Storage** tab
2. Click **Create Database** again
3. Choose **Blob** → Name it `labese-blob` → Click **Create**
4. Click **Connect** to link to your project
5. ✅ Done! Environment variables auto-added

## ✅ Step 3: Set Admin Login Credentials

1. Click **Settings** → **Environment Variables**
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

## ✅ Step 4: Redeploy

1. Go to **Deployments** tab
2. Click **⋮** (3 dots) on latest deployment
3. Click **Redeploy**
4. ✅ Wait for build to complete (~2-3 minutes)

## ✅ Step 5: Login to Admin

1. Visit: `https://your-site.vercel.app/admin/login`
2. Email: `admin@labese.com`
3. Password: `Nkurunziza123`
4. 🎉 You're in!

---

## 📋 Environment Variables Checklist

After completing steps above, you should have these in Vercel:

**Auto-added by KV:**
- ✅ KV_REST_API_URL
- ✅ KV_REST_API_TOKEN  
- ✅ KV_REST_API_READ_ONLY_TOKEN
- ✅ KV_URL

**Auto-added by Blob:**
- ✅ BLOB_READ_WRITE_TOKEN

**Manually added:**
- ✅ ADMIN_EMAIL
- ✅ ADMIN_PASSWORD

---

## 🆘 Problems?

See full guide: **VERCEL_SETUP.md**

**Build failing?** Check Vercel build logs for specific error

**Can't login?** Double-check ADMIN_EMAIL and ADMIN_PASSWORD are set exactly as shown

**Images not uploading?** Make sure BLOB_READ_WRITE_TOKEN exists (added by Blob storage)
