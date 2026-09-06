begin;
-- Versioned objects keep a failed or concurrent profile save from destroying a saved photo.
alter table public.adler_client_profiles drop constraint adler_client_profiles_check;
alter table public.adler_client_profiles add constraint adler_client_profiles_avatar_path_check
  check(avatar_path is null or avatar_path ~ ('^'||user_id::text||'/(avatar|[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$'));
create or replace function public.adler_portal_save_profile(p_revision integer,p_profile jsonb) returns public.adler_client_profiles
language plpgsql security definer set search_path = '' as $$
declare result public.adler_client_profiles; avatar text;
begin
  if not public.adler_portal_verified() then raise exception 'Acceso no autorizado.' using errcode='42501'; end if;
  avatar := nullif(p_profile->>'avatar_path','');
  if avatar is not null and (avatar !~ ('^'||auth.uid()::text||'/(avatar|[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$') or not exists(
    select 1 from storage.objects where bucket_id='adler-avatars' and name=avatar)) then
    raise exception 'La foto no está disponible.' using errcode='23514';
  end if;
  update public.adler_client_profiles set
    full_name=btrim(coalesce(p_profile->>'full_name','')), company=btrim(coalesce(p_profile->>'company','')),
    job_title=btrim(coalesce(p_profile->>'job_title','')), phone=btrim(coalesce(p_profile->>'phone','')),
    country=btrim(coalesce(p_profile->>'country','')), city=btrim(coalesce(p_profile->>'city','')),
    website=btrim(coalesce(p_profile->>'website','')), bio=btrim(coalesce(p_profile->>'bio','')),
    avatar_path=avatar, revision=revision+1, updated_at=now()
    where user_id=auth.uid() and revision=p_revision returning * into result;
  if not found then raise exception 'El perfil cambió. Recarga antes de guardar.' using errcode='40001'; end if;
  return result;
end $$;

drop policy adler_avatar_read on storage.objects;
drop policy adler_avatar_insert on storage.objects;
drop policy adler_avatar_update on storage.objects;
drop policy adler_avatar_delete on storage.objects;
create function public.adler_avatar_can_upload() returns boolean
language plpgsql security definer set search_path = '' as $$
begin
  if not public.adler_portal_verified() then return false; end if;
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(auth.uid()::text,1));
  return (select count(*) from storage.objects where bucket_id='adler-avatars' and name like auth.uid()::text||'/%')<5;
end $$;
revoke all on function public.adler_avatar_can_upload() from public,anon,authenticated;
grant execute on function public.adler_avatar_can_upload() to authenticated;
create policy adler_avatar_read on storage.objects for select to authenticated using(bucket_id='adler-avatars' and (select public.adler_portal_verified()) and (name ~ ('^'||(select auth.uid())::text||'/(avatar|[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$') or (select public.adler_portal_admin())));
create policy adler_avatar_insert on storage.objects for insert to authenticated with check(public.adler_avatar_can_upload() and bucket_id='adler-avatars' and (select public.adler_portal_verified()) and name ~ ('^'||(select auth.uid())::text||'/(avatar|[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$'));
create policy adler_avatar_update on storage.objects for update to authenticated using(bucket_id='adler-avatars' and (select public.adler_portal_verified()) and name ~ ('^'||(select auth.uid())::text||'/(avatar|[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$')) with check(bucket_id='adler-avatars' and (select public.adler_portal_verified()) and name ~ ('^'||(select auth.uid())::text||'/(avatar|[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$'));
create policy adler_avatar_delete on storage.objects for delete to authenticated using(bucket_id='adler-avatars' and (select public.adler_portal_verified()) and name ~ ('^'||(select auth.uid())::text||'/(avatar|[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$'));
commit;
