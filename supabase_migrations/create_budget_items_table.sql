-- Create budget_items table
create table budget_items (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  category text not null,
  item text not null,
  cost numeric not null,
  paid boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table budget_items enable row level security;

-- Policies
create policy "Users can view own budget items"
  on budget_items for select
  using (auth.uid() = user_id);

create policy "Users can insert own budget items"
  on budget_items for insert
  with check (auth.uid() = user_id);

create policy "Users can update own budget items"
  on budget_items for update
  using (auth.uid() = user_id);

create policy "Users can delete own budget items"
  on budget_items for delete
  using (auth.uid() = user_id);

-- Index for faster lookups
create index budget_items_user_id_idx on budget_items(user_id);

-- Add total_budget column to weddings table
alter table weddings add column if not exists total_budget numeric default 30000;
