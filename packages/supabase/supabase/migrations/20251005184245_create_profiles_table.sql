-- 1. Create the profiles table
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text unique not null,
  username text unique,
  display_name text,
  created_at timestamptz not null default now()
);

-- 2. Enable Row Level Security (RLS)
alter table public.profiles enable row level security;

-- 3. Create RLS Policies

-- Allow all authenticated users to read all profiles
create policy "Allow authenticated read access"
on public.profiles
for select
to authenticated
using (true);

-- Allow each user to update their own profile
create policy "Allow users to update own profile"
on public.profiles
for update
to authenticated
using (auth.uid() = id);

-- Allow the system (via trigger) or the same user to insert
create policy "Allow system insert on profile creation"
on public.profiles
for insert
to authenticated
with check (auth.uid() = id);

-- 4. Create the function that handles new user signups
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

-- 5. Create the trigger that fires after user signup
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();
