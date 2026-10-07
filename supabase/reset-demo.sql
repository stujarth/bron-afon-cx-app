-- Quick reset before (or after) the demo. Paste into the Supabase SQL editor for bron-afon-demo and run.
-- Removes every report submitted through the app (the seed data ends on 30 Sep 2026),
-- restarts numbering so the next report is DM-2026-1149, and removes the one-off staging table.
-- For a full rebuild of the seed data, run seed.sql instead.

delete from public.damp_mould_reports where created_at >= '2026-10-01';
select setval('public.damp_mould_report_seq', 1148);
drop table if exists public._seed_staging;

select count(*) as reports from public.damp_mould_reports; -- expect 450
