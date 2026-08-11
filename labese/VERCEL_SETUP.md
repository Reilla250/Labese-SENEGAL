# Vercel Deployment Setup

This project stores admin-editable content and uploaded images in TiDB Cloud.

## Required Environment Variables

Configure these in Vercel under **Project -> Settings -> Environment Variables**.

Use one of these database configurations.

### Option A: Single URL

```txt
DATABASE_URL=mysql://USER:PASSWORD@HOST:4000/DATABASE
```

### Option B: Separate TiDB Values

```txt
TIDB_HOST=your-tidb-host
TIDB_PORT=4000
TIDB_USER=your-tidb-user
TIDB_PASSWORD=your-tidb-password
TIDB_DATABASE=your-database-name
```

Also configure admin credentials:

```txt
ADMIN_EMAIL=admin@labese.com
ADMIN_PASSWORD=use-a-strong-password
SESSION_SECRET=use-a-long-random-secret
```

`SESSION_SECRET` is optional in code but should be set in production.

## Redeploy

After changing environment variables, redeploy from the Vercel Deployments tab.

## Troubleshooting

If admin saves show `Database not configured`, the deployment does not have `DATABASE_URL` and is also missing at least one of `TIDB_HOST`, `TIDB_USER`, `TIDB_PASSWORD`, or `TIDB_DATABASE`.

If pages load but admin saves fail, check the Vercel runtime logs for the exact TiDB connection error. The app creates these tables automatically:

```sql
labese_data
labese_images
```

If image upload fails, confirm the same TiDB variables are present because images are stored in `labese_images`.
