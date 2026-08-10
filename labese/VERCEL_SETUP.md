# Vercel Deployment Setup Guide

This guide will help you configure Vercel Blob storage for the LABESE website.

## Architecture: 100% Vercel Blob Solution

Since Vercel has deprecated their native KV product, this project uses **Vercel Blob for everything**:

- **Images**: Stored as files in `/images/` folder (public)
- **Metadata**: Stored as JSON in `/metadata/` folder (private)
- **Site Data**: Stored as JSON in `/data/` folder (programmes, initiatives, etc.)

No third-party databases needed!

## Prerequisites

- GitHub repository connected to Vercel
- Vercel account with access to the project

## Step 1: Connect Your Blob Storage

You already have a Blob store (`fbst-uploads`)! Just connect it:

1. Go to https://vercel.com/dashboard
2. Select your **Labese-SENEGAL** project
3. Click on the **Storage** tab
4. Click on **fbst-uploads**
5. Click **"Connect to Project"**
6. Select your project
7. ✅ Vercel will automatically add the `BLOB_READ_WRITE_TOKEN` environment variable

## Step 2: Set Admin Credentials

These are needed to log into the admin panel at `/admin/login`

1. Go to **Settings** → **Environment Variables**
2. Add these two variables:

   | Name | Value | Environment |
   |------|-------|-------------|
   | `ADMIN_EMAIL` | `admin@labese.com` | Production, Preview, Development |
   | `ADMIN_PASSWORD` | `Nkurunziza123` | Production, Preview, Development |

3. Click **Save** for each

## Step 3: Redeploy

After adding all environment variables:

1. Go to **Deployments** tab
2. Find the latest deployment
3. Click the **⋮** menu → **Redeploy**
4. Check **Use existing Build Cache** (optional)
5. Click **Redeploy**

## Step 4: Access Admin Panel

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

- Ensure Vercel Blob is properly connected
- Check that `BLOB_READ_WRITE_TOKEN` is set
- Redeploy after connecting Blob storage

### Image Upload Fails

- Ensure Vercel Blob is properly connected
- Check that `BLOB_READ_WRITE_TOKEN` is set
- Verify the token has read/write permissions

### Can't Login to Admin

- Verify `ADMIN_EMAIL` and `ADMIN_PASSWORD` are set correctly
- Check capitalization (environment variables are case-sensitive)
- Clear browser cookies and try again

### Data Not Persisting

- Edits are saved to Blob storage as JSON files in `/data/` folder
- Check Vercel logs for any Blob API errors
- Verify `BLOB_READ_WRITE_TOKEN` has write permissions

## Local Development

To run locally with Vercel storage:

1. Install Vercel CLI: `npm i -g vercel`
2. Link project: `vercel link`
3. Pull environment variables: `vercel env pull .env.local`
4. Start dev server: `npm run dev`

This downloads all environment variables from Vercel to your local machine.

## How It Works

### Data Storage

When you edit site settings, programmes, or other content in the admin panel:

1. Data is serialized to JSON
2. JSON is stored as a file in Vercel Blob (`/data/{collection}.json`)
3. Next.js reads from Blob or falls back to default data from `/data/` folder

### Image Storage

When you upload an image:

1. Image is stored in Blob (`/images/{id}.{ext}`)
2. Metadata is stored as JSON in Blob (`/metadata/{id}.json`)
3. Both are retrieved together using the image ID

### Key Benefits

- ✅ 100% first-party Vercel solution
- ✅ No third-party databases or integrations
- ✅ No additional costs beyond Vercel Blob pricing
- ✅ Simple, file-based architecture
- ✅ Easy to backup (just download Blob contents)

## Environment Variables Reference

| Variable | Purpose | Auto-Added? |
|----------|---------|-------------|
| `BLOB_READ_WRITE_TOKEN` | Access token for Vercel Blob | ✅ Yes (when you connect Blob) |
| `ADMIN_EMAIL` | Admin login email | ❌ Manual |
| `ADMIN_PASSWORD` | Admin login password | ❌ Manual |
| `SESSION_SECRET` | Session encryption (optional) | ❌ Manual |
