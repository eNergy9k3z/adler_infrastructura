begin;

-- Legacy names remain untouched. Never infer surnames by splitting spaces.
alter table public.contacts
  add column first_name text,
  add column last_name text;
alter table public.contacts add constraint adler_contacts_name_parts check (
  (first_name is null and last_name is null)
  or (first_name is not null and last_name is not null
    and char_length(btrim(first_name)) between 1 and 120
    and char_length(btrim(last_name)) between 1 and 120)
);
grant insert (first_name,last_name) on public.contacts to anon, authenticated;

create or replace function public.adler_validate_contact() returns trigger
language plpgsql set search_path = '' as $$
begin
  if tg_op = 'INSERT' then
    if new.first_name is not null or new.last_name is not null then
      new.first_name := btrim(new.first_name);
      new.last_name := btrim(new.last_name);
      if new.first_name is null or new.last_name is null
        or new.first_name !~ '[^[:space:]]' or new.last_name !~ '[^[:space:]]'
        or char_length(new.first_name) not between 1 and 120
        or char_length(new.last_name) not between 1 and 120 then
        raise exception 'Indique su nombre y sus apellidos.' using errcode='23514';
      end if;
      new.name := new.first_name || ' ' || new.last_name;
    else
      -- Older open browser tabs can continue submitting the original contract.
      new.name := btrim(new.name);
      if new.name is null or char_length(new.name) not between 1 and 120 then
        raise exception 'Indique su nombre.' using errcode='23514';
      end if;
    end if;
    new.email := btrim(new.email);
    new.message := btrim(new.message);
    if new.email is null or char_length(new.email) not between 3 and 200
      or new.email !~ '^[^[:space:]@<>]+@[^[:space:]@<>]+\.[^[:space:]@<>]+$'
      or new.message is null or char_length(new.message) not between 1 and 5300
      or char_length(coalesce(new.phone,'')) > 40
      or char_length(coalesce(new.company,'')) > 160 then
      raise exception 'La consulta contiene campos no válidos.' using errcode='23514';
    end if;
  else
    new.revision := old.revision + 1;
  end if;
  new.updated_at := now();
  return new;
end $$;

-- The caller still needs SELECT and passes the existing administrator RLS.
-- IDs travel as text to preserve bigint precision in a browser and in Excel.
create function public.adler_export_contacts(
  p_query text default '', p_status text default '',
  p_until bigint default null, p_before bigint default null
) returns jsonb language plpgsql stable security invoker set search_path = '' as $$
declare ceiling_id bigint; result jsonb;
begin
  if not exists (select 1 from public.adler_admins where user_id=auth.uid()) then
    raise exception 'Acceso exclusivo de administración.' using errcode='42501';
  end if;
  select coalesce(p_until,max(id),0) into ceiling_id from public.contacts;
  with matches as materialized (
    select c.id,c.created_at,c.first_name,c.last_name,c.name,c.email,c.company,c.phone,c.status,c.message
    from public.contacts c
    where c.id <= ceiling_id
      and (coalesce(p_status,'')='' or c.status=p_status)
      and (coalesce(btrim(p_query),'')='' or position(lower(left(btrim(p_query),200)) in
        lower(concat_ws(' ',c.name,c.email,c.company,c.message))) > 0)
  ), batch as (
    select * from matches where p_before is null or id < p_before order by id desc limit 500
  )
  select jsonb_build_object(
    'until',ceiling_id::text,
    'total',(select count(*) from matches),
    'items',coalesce((select jsonb_agg(to_jsonb(b) || jsonb_build_object('id',b.id::text) order by b.id desc) from batch b),'[]'::jsonb),
    'next_before',case when exists (
      select 1 from matches where id < (select min(id) from batch)
    ) then (select min(id)::text from batch) else null end
  ) into result;
  return result;
end $$;
revoke all on function public.adler_export_contacts(text,text,bigint,bigint) from public,anon,authenticated;
grant execute on function public.adler_export_contacts(text,text,bigint,bigint) to authenticated;
commit;
