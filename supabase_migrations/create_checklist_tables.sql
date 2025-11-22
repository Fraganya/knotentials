-- Create checklist_sections table
create table checklist_sections (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  letter text not null,
  title text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, letter)
);

-- Create checklist_details table
create table checklist_details (
  id uuid default gen_random_uuid() primary key,
  section_id uuid references checklist_sections(id) on delete cascade not null,
  label text not null,
  value text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create checklist_items table (Action Items)
create table checklist_items (
  id uuid default gen_random_uuid() primary key,
  section_id uuid references checklist_sections(id) on delete cascade not null,
  text text not null,
  completed boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table checklist_sections enable row level security;
alter table checklist_details enable row level security;
alter table checklist_items enable row level security;

-- Policies for checklist_sections
create policy "Users can view own checklist sections"
  on checklist_sections for select
  using (auth.uid() = user_id);

create policy "Users can insert own checklist sections"
  on checklist_sections for insert
  with check (auth.uid() = user_id);

create policy "Users can update own checklist sections"
  on checklist_sections for update
  using (auth.uid() = user_id);

create policy "Users can delete own checklist sections"
  on checklist_sections for delete
  using (auth.uid() = user_id);

-- Policies for checklist_details
create policy "Users can view own checklist details"
  on checklist_details for select
  using (exists (
    select 1 from checklist_sections
    where checklist_sections.id = checklist_details.section_id
    and checklist_sections.user_id = auth.uid()
  ));

create policy "Users can insert own checklist details"
  on checklist_details for insert
  with check (exists (
    select 1 from checklist_sections
    where checklist_sections.id = checklist_details.section_id
    and checklist_sections.user_id = auth.uid()
  ));

create policy "Users can update own checklist details"
  on checklist_details for update
  using (exists (
    select 1 from checklist_sections
    where checklist_sections.id = checklist_details.section_id
    and checklist_sections.user_id = auth.uid()
  ));

create policy "Users can delete own checklist details"
  on checklist_details for delete
  using (exists (
    select 1 from checklist_sections
    where checklist_sections.id = checklist_details.section_id
    and checklist_sections.user_id = auth.uid()
  ));

-- Policies for checklist_items
create policy "Users can view own checklist items"
  on checklist_items for select
  using (exists (
    select 1 from checklist_sections
    where checklist_sections.id = checklist_items.section_id
    and checklist_sections.user_id = auth.uid()
  ));

create policy "Users can insert own checklist items"
  on checklist_items for insert
  with check (exists (
    select 1 from checklist_sections
    where checklist_sections.id = checklist_items.section_id
    and checklist_sections.user_id = auth.uid()
  ));

create policy "Users can update own checklist items"
  on checklist_items for update
  using (exists (
    select 1 from checklist_sections
    where checklist_sections.id = checklist_items.section_id
    and checklist_sections.user_id = auth.uid()
  ));

create policy "Users can delete own checklist items"
  on checklist_items for delete
  using (exists (
    select 1 from checklist_sections
    where checklist_sections.id = checklist_items.section_id
    and checklist_sections.user_id = auth.uid()
  ));
