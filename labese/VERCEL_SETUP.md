# Vercel Deployment Setup Guide

This guide will help you configure Vercel Blob and KV storage for the LABESE website.

## Prerequisites

- GitHub repository connected to Vercel
- Vercel account with access to the project

## Step 1: Enable Vercel KV (Redis Database)

Vercel KV stores all your admin-editable content (site info, programmes, initiatives, etc.)

1. Go to https://vercel.com/dashboard
2. Select your **Labese-SENEGAL** project
3. Click on the **Storage** tab in the top navigation
4. Click **Create Database** or **Connect Store**
5. Select **KV** (Redis-compatible database)
6. Click **Create** and choose a name like `labese-kv`
7. Click **Connect** to link it to your project
8. ✅ Vercel will automatically add these environment variables to your project:
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`
   - `KV_REST_API_READ_ONLY_TOKEN`
   - `KV_URL`

## Step 2: Enable Vercel Blob (File Storage)

Vercel Blob stores uploaded images from the admin panel.

1. Still in the **Storage** tab
2. Click **Create Database** or **Connect Store** again
3. Select **Blob** (Object storage for files)
4. Click **Create** and choose a name like `labese-blob`
5. Click **Connect** to link it to your project
6. ✅ Vercel will automatically add this environment variable:
   - `BLOB_READ_WRITE_TOKEN`

## Step 3: Set Admin Credentials

These are needed to log into the admin panel at `/admin/login`

1. Go to **Settings** → **Environment Variables**
2. Add these two variables:

   | Name | Value | Environment |
   |------|-------|-------------|
   | `ADMIN_EMAIL` | `admin@labese.com` | Production, Preview, Development |
   | `ADMIN_PASSWORD` | `Nkurunziza123` | Production, Preview, Development |

3. Click **Save** for each

## Step 4: Set Session Secret (Optional but Recommended)

For secure admin sessions:

1. Generate a random string (32+ characters): https://randomkeygen.com/
2. Add environment variable:

   | Name | Value | Environment |
   |------|-------|-------------|
   | `SESSION_SECRET` | `your_random_string_here` | Production, Preview, Development |

## Step 5: Redeploy

After adding all environment variables:

1. Go to **Deployments** tab
2. Find the latest deployment
3. Click the **⋮** menu → **Redeploy**
4. Check **Use existing Build Cache** (optional)
5. Click **Redeploy**

## Step 6: Access Admin Panel

Once deployed successfully:

1. Visit: `https://your-domain.vercel.app/admin/login`
2. Login with:
   - **Email**: `admin@labese.com`
   - **Password**: `Nkurunziza123`

## Troubleshooting

### Build Fails

- Check the build logs for specific errors
- Ensure all TypeScript errors are resolved
- Verify environment variables are set

### "Database write failed" Error

- Ensure Vercel KV is properly connected
- Check that `KV_REST_API_URL` and `KV_REST_API_TOKEN` are set
- Redeploy after adding KV

### Image Upload Fails

- Ensure Vercel Blob is properly connected
- Check that `BLOB_READ_WRITE_TOKEN` is set
- Redeploy after adding Blob

### Can't Login to Admin

- Verify `ADMIN_EMAIL` and `ADMIN_PASSWORD` are set correctly
- Check capitalization (environment variables are case-sensitive)
- Clear browser cookies and try again

## Local Development

To run locally with Vercel storage:

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel env pull .env.local`
3. Start dev server: `npm run dev`

This downloads all environment variables from Vercel to your local machine.

## Architecture

- **Vercel KV**: Stores JSON data (site settings, programmes, initiatives, impact metrics, etc.)
- **Vercel Blob**: Stores uploaded images
- **Next.js**: Server-side rendering and API routes
- **File System Fallback**: If KV is not configured, uses default data from `/data/` folder
