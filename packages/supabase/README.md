# Supabase

## How to work locally with Supabase CLI and migration files

```bash
cd packages/supabase
```

```bash
npx supabase login
```

```bash
npx supabase link --project-ref <your_project_id>
```

Create a new migration file

```bash
npx supabase migration new <migration_name>
```

Apply Migrations to remote

```bash
npx supabase db push --linked
```

Generate TS types

```bash
npx supabase gen types typescript --linked > src/database.types.ts
```
