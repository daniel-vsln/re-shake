# Database — Supabase migrations

## Workflow

### First-time setup

```bash
brew install supabase/tap/supabase
supabase login
supabase link --project-ref <your-project-ref>
```

### Apply migrations to remote

```bash
supabase db push
```

### Local development (Docker required)

```bash
supabase start          # spins up local Postgres + Studio
supabase db reset       # wipe + replay all migrations + seed.sql
supabase stop
```

### Generate TypeScript types from live schema

```bash
supabase gen types typescript --linked > types/supabase.ts
```

---

## Making schema changes

**Never edit existing migration files.** Always create a new one:

```bash
supabase migration new <describe_change>
# → supabase/migrations/<timestamp>_<describe_change>.sql
```

Edit the new file, then:

```bash
supabase db push        # apply to remote
supabase gen types typescript --linked > types/supabase.ts
git add supabase/migrations/ types/supabase.ts
git commit -m "db: <describe change>"
```

---

## Migration files

| File                        | Contents                     |
| --------------------------- | ---------------------------- |
| `000001_initial_schema.sql` | All tables + seed categories |
| `000002_rls.sql`            | Row Level Security policies  |
| `000003_functions.sql`      | Triggers + stored procedures |

## Stored procedures

| Function                                      | Called from                                           |
| --------------------------------------------- | ----------------------------------------------------- |
| `handle_new_user()`                           | Trigger on `auth.users` insert — auto-creates profile |
| `clone_cocktail(source_id, new_id, new_name)` | App — "Create Twist" button                           |
| `record_training_result(...)`                 | App — after training flow completes                   |
