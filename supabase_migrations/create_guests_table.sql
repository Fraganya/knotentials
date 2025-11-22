-- Create guests table
create table guests (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  email text,
  phone text,
  invited boolean default true,
  confirmed boolean default false,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table guests enable row level security;

-- Policies
create policy "Users can view own guests"
  on guests for select
  using (auth.uid() = user_id);

create policy "Users can insert own guests"
  on guests for insert
  with check (auth.uid() = user_id);

create policy "Users can update own guests"
  on guests for update
  using (auth.uid() = user_id);

create policy "Users can delete own guests"
  on guests for delete
  using (auth.uid() = user_id);

-- Index for faster lookups
create index guests_user_id_idx on guests(user_id);
