-- Create weddings table
create table weddings (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  partner_name text not null,
  wedding_date date not null,
  budget numeric,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  -- Ensure one wedding per user
  unique(user_id)
);

-- Enable Row Level Security
alter table weddings enable row level security;

-- Policy: Users can only see their own wedding
create policy "Users can view own wedding"
  on weddings for select
  using (auth.uid() = user_id);

-- Policy: Users can insert their own wedding
create policy "Users can insert own wedding"
  on weddings for insert
  with check (auth.uid() = user_id);

-- Policy: Users can update their own wedding
create policy "Users can update own wedding"
  on weddings for update
  using (auth.uid() = user_id);

-- Create index for faster lookups
create index weddings_user_id_idx on weddings(user_id);
