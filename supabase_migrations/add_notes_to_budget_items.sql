-- Add notes column to budget_items table
alter table budget_items add column if not exists notes text;
