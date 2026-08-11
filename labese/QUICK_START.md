# Quick Start: Configure Vercel + TiDB

## 1. Set Database Variables

In Vercel, open the project, then go to **Settings -> Environment Variables**.

Add either the single TiDB connection URL:

```txt
DATABASE_URL=mysql://USER:PASSWORD@HOST:4000/DATABASE
```

Or add the separate values:

```txt
TIDB_HOST=your-tidb-host
TIDB_PORT=4000
TIDB_USER=your-tidb-user
TIDB_PASSWORD=your-tidb-password
TIDB_DATABASE=your-database-name
```

Set them for **Production**, **Preview**, and **Development** if you use all environments.

## 2. Set Admin Login

```txt
ADMIN_EMAIL=admin@labese.com
ADMIN_PASSWORD=use-a-strong-password
```

Optional but recommended:

```txt
SESSION_SECRET=use-a-long-random-secret
```

## 3. Redeploy

After saving environment variables, redeploy the latest Vercel deployment.

The admin pages save content and uploaded image metadata/data to TiDB. If saves fail with `Database not configured`, Vercel is missing `DATABASE_URL` or one of the required `TIDB_*` variables above.
