begin;

-- A separate client workspace: no changes to contacts or its private notes.
create function public.adler_portal_verified() returns boolean
language sql stable security definer set search_path = '' as $$
  select exists(select 1 from auth.users where id=(select auth.uid())
    and email_confirmed_at is not null and coalesce(is_anonymous,false)=false);
$$;
create function public.adler_portal_admin() returns boolean
language sql stable security definer set search_path = '' as $$
  select public.adler_portal_verified() and exists(
    select 1 from public.adler_admins where user_id=(select auth.uid()));
$$;
revoke all on function public.adler_portal_verified(), public.adler_portal_admin() from public, anon, authenticated;
grant execute on function public.adler_portal_verified(), public.adler_portal_admin() to authenticated;

create table public.adler_client_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '' check (char_length(full_name)<=120),
  company text not null default '' check (char_length(company)<=160),
  job_title text not null default '' check (char_length(job_title)<=120),
  phone text not null default '' check (char_length(phone)<=40),
  country text not null default '' check (char_length(country)<=80),
  city text not null default '' check (char_length(city)<=100),
  website text not null default '' check (website='' or (char_length(website)<=250 and website ~ '^https?://[^[:space:]]+$')),
  bio text not null default '' check (char_length(bio)<=1000),
  avatar_path text check (avatar_path is null or avatar_path=user_id::text||'/avatar'),
  revision integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table public.adler_client_requests (
  id uuid primary key,
  client_id uuid not null references public.adler_client_profiles(user_id),
  subject text not null check(char_length(btrim(subject)) between 1 and 160),
  description text not null check(char_length(btrim(description)) between 1 and 10000),
  service text not null check(service in ('vialidad','contratos','materiales','ia','general')),
  kind text not null check(kind in ('solicitud','pregunta')),
  status text not null default 'nueva' check(status in ('nueva','revision','curso','espera','resuelta','cerrada')),
  revision integer not null default 0,
  last_sender_id uuid not null references auth.users(id),
  last_message_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table public.adler_client_messages (
  id uuid primary key,
  sequence bigint generated always as identity unique,
  request_id uuid not null references public.adler_client_requests(id) on delete cascade,
  sender_id uuid not null references auth.users(id),
  from_adler boolean not null,
  body text not null check(char_length(btrim(body)) between 1 and 10000),
  created_at timestamptz not null default now()
);
create table public.adler_client_reads (
  request_id uuid not null references public.adler_client_requests(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  last_read_at timestamptz not null,
  primary key(request_id,user_id)
);
create index adler_client_requests_owner_updated on public.adler_client_requests(client_id,updated_at desc,id);
create index adler_client_requests_updated on public.adler_client_requests(updated_at desc,id);
create index adler_client_messages_thread on public.adler_client_messages(request_id,sequence desc);
create index adler_client_messages_sender on public.adler_client_messages(sender_id,created_at desc);

alter table public.adler_client_profiles enable row level security;
alter table public.adler_client_requests enable row level security;
alter table public.adler_client_messages enable row level security;
alter table public.adler_client_reads enable row level security;
revoke all on public.adler_client_profiles, public.adler_client_requests, public.adler_client_messages, public.adler_client_reads from public, anon, authenticated;
grant select on public.adler_client_profiles, public.adler_client_requests, public.adler_client_messages, public.adler_client_reads to authenticated;
create policy portal_profile_read on public.adler_client_profiles for select to authenticated
  using ((select public.adler_portal_verified()) and (user_id=(select auth.uid()) or (select public.adler_portal_admin())));
create policy portal_request_read on public.adler_client_requests for select to authenticated
  using ((select public.adler_portal_verified()) and (client_id=(select auth.uid()) or (select public.adler_portal_admin())));
create policy portal_message_read on public.adler_client_messages for select to authenticated
  using ((select public.adler_portal_verified()) and exists(select 1 from public.adler_client_requests r where r.id=request_id));
create policy portal_reads_self on public.adler_client_reads for select to authenticated
  using ((select public.adler_portal_verified()) and user_id=(select auth.uid()));

-- Mutations use narrow, verified RPCs. Client-supplied identities/roles are never accepted.
create function public.adler_portal_profile() returns public.adler_client_profiles
language plpgsql security definer set search_path = '' as $$
declare result public.adler_client_profiles;
begin
  if not public.adler_portal_verified() then raise exception 'Verifica tu correo para continuar.' using errcode='42501'; end if;
  insert into public.adler_client_profiles(user_id,full_name)
    select id,left(btrim(coalesce(raw_user_meta_data->>'full_name','')),120) from auth.users where id=auth.uid()
    on conflict(user_id) do nothing;
  select * into result from public.adler_client_profiles where user_id=auth.uid();
  return result;
end $$;

create function public.adler_portal_save_profile(p_revision integer,p_profile jsonb) returns public.adler_client_profiles
language plpgsql security definer set search_path = '' as $$
declare result public.adler_client_profiles; avatar text;
begin
  if not public.adler_portal_verified() then raise exception 'Acceso no autorizado.' using errcode='42501'; end if;
  avatar := nullif(p_profile->>'avatar_path','');
  if avatar is not null and (avatar<>auth.uid()::text||'/avatar' or not exists(
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

create function public.adler_portal_create_request(p_id uuid,p_subject text,p_description text,p_service text,p_kind text)
returns public.adler_client_requests language plpgsql security definer set search_path = '' as $$
declare result public.adler_client_requests;
begin
  if not public.adler_portal_verified() then raise exception 'Acceso no autorizado.' using errcode='42501'; end if;
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(auth.uid()::text,0));
  select * into result from public.adler_client_requests where id=p_id;
  if found then
    if result.client_id=auth.uid() and result.subject=btrim(p_subject) and result.description=btrim(p_description)
      and result.service=p_service and result.kind=p_kind then return result; end if;
    raise exception 'Solicitud no disponible.' using errcode='42501';
  end if;
  if (select count(*) from public.adler_client_requests where client_id=auth.uid() and created_at>now()-interval '24 hours')>=20 then
    raise exception 'Has alcanzado el límite diario de solicitudes. Continúa en una conversación existente.' using errcode='P0001';
  end if;
  perform public.adler_portal_profile();
  insert into public.adler_client_requests(id,client_id,subject,description,service,kind,last_sender_id)
    values(p_id,auth.uid(),btrim(p_subject),btrim(p_description),p_service,p_kind,auth.uid()) returning * into result;
  return result;
end $$;

create function public.adler_portal_send_message(p_id uuid,p_request_id uuid,p_body text)
returns public.adler_client_messages language plpgsql security definer set search_path = '' as $$
declare result public.adler_client_messages; request public.adler_client_requests; admin boolean;
begin
  if not public.adler_portal_verified() then raise exception 'Acceso no autorizado.' using errcode='42501'; end if;
  admin:=public.adler_portal_admin();
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(auth.uid()::text,0));
  select * into request from public.adler_client_requests where id=p_request_id for update;
  if not found or (request.client_id<>auth.uid() and not admin) then
    raise exception 'Conversación no disponible.' using errcode='42501';
  end if;
  select * into result from public.adler_client_messages where id=p_id;
  if found then
    if result.sender_id=auth.uid() and result.request_id=p_request_id and result.body=btrim(p_body) then return result; end if;
    raise exception 'Mensaje no disponible.' using errcode='42501';
  end if;
  if request.status='cerrada' then raise exception 'Esta conversación está cerrada. Crea una nueva solicitud.' using errcode='P0001'; end if;
  if (select count(*) from public.adler_client_messages where sender_id=auth.uid() and created_at>now()-interval '1 hour')>=60 then
    raise exception 'Has alcanzado el límite temporal de mensajes. Vuelve más tarde.' using errcode='P0001';
  end if;
  insert into public.adler_client_messages(id,request_id,sender_id,from_adler,body)
    values(p_id,p_request_id,auth.uid(),admin,btrim(p_body)) returning * into result;
  update public.adler_client_requests set last_sender_id=auth.uid(), last_message_at=result.created_at,
    updated_at=now(), revision=revision+1 where id=p_request_id;
  return result;
end $$;

create function public.adler_portal_set_status(p_id uuid,p_revision integer,p_status text)
returns public.adler_client_requests language plpgsql security definer set search_path = '' as $$
declare result public.adler_client_requests;
begin
  if not public.adler_portal_admin() then raise exception 'Solo Adler puede cambiar el estado.' using errcode='42501'; end if;
  update public.adler_client_requests set status=p_status,updated_at=now(),revision=revision+1
    where id=p_id and revision=p_revision returning * into result;
  if not found then raise exception 'La solicitud cambió. Actualízala antes de guardar.' using errcode='40001'; end if;
  return result;
end $$;

create function public.adler_portal_mark_read(p_id uuid,p_seen_at timestamptz) returns void
language plpgsql security definer set search_path = '' as $$
begin
  if not public.adler_portal_verified() or not exists(select 1 from public.adler_client_requests
    where id=p_id and (client_id=auth.uid() or public.adler_portal_admin())) then
    raise exception 'Conversación no disponible.' using errcode='42501';
  end if;
  insert into public.adler_client_reads(request_id,user_id,last_read_at) values(p_id,auth.uid(),least(p_seen_at,now()))
    on conflict(request_id,user_id) do update set last_read_at=greatest(adler_client_reads.last_read_at,excluded.last_read_at);
end $$;

create function public.adler_portal_list(p_scope text default 'mine',p_query text default '',p_status text default '',p_page integer default 0)
returns jsonb language sql stable security invoker set search_path = '' as $$
  with matches as (
    select r.*,p.full_name,p.company,coalesce(rd.last_read_at,'epoch'::timestamptz)<r.last_message_at
      and r.last_sender_id<>(select auth.uid()) as unread
    from public.adler_client_requests r join public.adler_client_profiles p on p.user_id=r.client_id
    left join public.adler_client_reads rd on rd.request_id=r.id and rd.user_id=(select auth.uid())
    where (p_scope='all' or r.client_id=(select auth.uid()))
      and (coalesce(p_status,'')='' or r.status=p_status)
      and (coalesce(btrim(p_query),'')='' or position(lower(left(btrim(p_query),200)) in
        lower(concat_ws(' ',r.subject,r.description,p.full_name,p.company)))>0)
  ), page_rows as (
    select * from matches order by updated_at desc,id limit 20 offset greatest(coalesce(p_page,0),0)::bigint*20
  ) select jsonb_build_object('items',coalesce((select jsonb_agg(to_jsonb(p) order by p.updated_at desc,p.id) from page_rows p),'[]'::jsonb),
    'total',(select count(*) from matches), 'unread',(select count(*) from matches where unread),
    'active',(select count(*) from matches where status not in ('resuelta','cerrada')));
$$;

revoke all on function public.adler_portal_profile(),public.adler_portal_save_profile(integer,jsonb),
  public.adler_portal_create_request(uuid,text,text,text,text),public.adler_portal_send_message(uuid,uuid,text),
  public.adler_portal_set_status(uuid,integer,text),public.adler_portal_mark_read(uuid,timestamptz),
  public.adler_portal_list(text,text,text,integer) from public,anon,authenticated;
grant execute on function public.adler_portal_profile(),public.adler_portal_save_profile(integer,jsonb),
  public.adler_portal_create_request(uuid,text,text,text,text),public.adler_portal_send_message(uuid,uuid,text),
  public.adler_portal_set_status(uuid,integer,text),public.adler_portal_mark_read(uuid,timestamptz),
  public.adler_portal_list(text,text,text,integer) to authenticated;

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
  values('adler-avatars','adler-avatars',false,2097152,array['image/jpeg','image/png','image/webp']);
create policy adler_avatar_read on storage.objects for select to authenticated
  using(bucket_id='adler-avatars' and (select public.adler_portal_verified()) and
    (name=(select auth.uid())::text||'/avatar' or (select public.adler_portal_admin())));
create policy adler_avatar_insert on storage.objects for insert to authenticated
  with check(bucket_id='adler-avatars' and (select public.adler_portal_verified()) and name=(select auth.uid())::text||'/avatar');
create policy adler_avatar_update on storage.objects for update to authenticated
  using(bucket_id='adler-avatars' and (select public.adler_portal_verified()) and name=(select auth.uid())::text||'/avatar')
  with check(bucket_id='adler-avatars' and (select public.adler_portal_verified()) and name=(select auth.uid())::text||'/avatar');
create policy adler_avatar_delete on storage.objects for delete to authenticated
  using(bucket_id='adler-avatars' and (select public.adler_portal_verified()) and name=(select auth.uid())::text||'/avatar');

commit;
