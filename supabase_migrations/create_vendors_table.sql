-- Create vendors table
create table vendors (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  service text not null,
  contact text,
  email text,
  cost numeric,
  paid boolean default false,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table vendors enable row level security;

-- Policies
create policy "Users can view own vendors"
  on vendors for select
  using (auth.uid() = user_id);

create policy "Users can insert own vendors"
  on vendors for insert
  with check (auth.uid() = user_id);

create policy "Users can update own vendors"
  on vendors for update
  using (auth.uid() = user_id);

create policy "Users can delete own vendors"
  on vendors for delete
  using (auth.uid() = user_id);

-- Index for faster lookups
create index vendors_user_id_idx on vendors(user_id);
